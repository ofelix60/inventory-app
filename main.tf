provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAQRX5MYE4WLQ5FMJG"
  secret_key = "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"
}

resource "aws_ecs_cluster" "MyCluster" {
  name = "MyCluster"
}

# CLIENT SERVICE
resource "aws_ecs_service" "client-container-service" {
  launch_type     = "FARGATE"
  name            = "client-container-service"
  cluster         = aws_ecs_cluster.MyCluster.id
  task_definition = aws_ecs_task_definition.client-task-definition.arn
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.client-lb-target-group.id
    container_name   = "client"
    container_port   = 3000
  }

  depends_on = [
    aws_lb_listener.client-lb-listener
  ]

  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
  }
}

# SERVER SERVICE
resource "aws_ecs_service" "server-container-service" {
  launch_type     = "FARGATE"
  name            = "server-container-service"
  cluster         = aws_ecs_cluster.MyCluster.id
  task_definition = aws_ecs_task_definition.server-task-definition.arn
  desired_count   = 1


  load_balancer {
    target_group_arn = aws_lb_target_group.server-lb-target-group.id
    container_name   = "server"
    container_port   = 8000
  }

  depends_on = [
    aws_lb_listener.lb-listener
  ]

  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
  }
}


resource "aws_ecs_task_definition" "client-task-definition" {
  family                   = "client-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions    = <<EOF
[
  {
    "name": "client",
    "image": "ghcr.io/ofelix60/inventory-app_client:main",
    "memory": 2048,
    "cpu": 512,
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "containerPort": 3000,
        "protocol": "tcp"
      }
    ],
    "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "firelens-container",
                    "awslogs-region": "us-west-2",
                    "awslogs-create-group": "true",
                    "awslogs-stream-prefix": "firelens"
                }
      },
        "environment": [
      {"name": "REACT_APP_BASEURL","value": "http://${aws_lb.server-lb.dns_name}/api/"}
    ]
  }
]
EOF
}

resource "aws_ecs_task_definition" "server-task-definition" {
  family                   = "server-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions    = <<EOF
[
  {
    "name": "server",
    "image": "ghcr.io/ofelix60/inventory-app_server:main",
    "memory": 2048,
    "cpu": 512,
    "networkMode": "awsvpc",
    "portMappings": [
  {
    "containerPort": 8000,
    "protocol": "tcp"
  }
],
    "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "firelens-container",
                    "awslogs-region": "us-west-2",
                    "awslogs-create-group": "true",
                    "awslogs-stream-prefix": "firelens"
                }
      },
        "environment": [
      {"name": "CLIENT_URL","value": "http://${aws_lb.client-lb.dns_name}"},
      {"name": "SECRET","value": "qwerty"},
      {"name": "DATABASE_URL","value": "postgres://ofelix60:Y4oan0zFXPqC@ep-late-limit-066898.us-west-2.aws.neon.tech/neondb"}
    ]
  }
]
EOF
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "ecs_task_execution_policy" {
  name        = "ecsTaskExecutionPolicy"
  description = "Policy for ECS task execution role"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:Describe*",
        "ec2:DetachNetworkInterface",
        "ec2:AttachNetworkInterface",
        "ecs:CreateCluster",
        "ecs:DeregisterContainerInstance",
        "ecs:DiscoverPollEndpoint",
        "ecs:Poll",
        "ecs:RegisterContainerInstance",
        "ecs:StartTelemetrySession",
        "ecs:Submit*",
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}


resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_policy.ecs_task_execution_policy.arn
}


resource "aws_security_group" "ContainerFromALBSecurityGroup" {
  vpc_id      = aws_vpc.my_vpc.id
  name        = "security_group"
  description = "Allow traffic to the client container"

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_vpc" "my_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    "Name" = "VPC"
  }
}


resource "aws_subnet" "subnet_a" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    "Name" = "Subnet A"
  }
}


resource "aws_subnet" "subnet_b" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    "Name" = "Subnet B"
  }
}


resource "aws_internet_gateway" "my_gateway" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "My Gateway"
  }
}


resource "aws_route_table" "my_route_table" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_gateway.id
  }

  tags = {
    Name = "My Route Table"
  }
}


resource "aws_route_table_association" "subnet_a" {
  subnet_id      = aws_subnet.subnet_a.id
  route_table_id = aws_route_table.my_route_table.id
}

resource "aws_route_table_association" "subnet_b" {
  subnet_id      = aws_subnet.subnet_b.id
  route_table_id = aws_route_table.my_route_table.id
}

///


resource "aws_lb_target_group" "server-lb-target-group" {
  name        = "server-tg"
  target_type = "ip"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.my_vpc.id

  health_check {
    path = "/api/"
  }
}

resource "aws_lb" "server-lb" {
  name               = "server-lb"
  internal           = false
  ip_address_type    = "ipv4"
  load_balancer_type = "application"
  subnets            = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
  security_groups    = [aws_security_group.ContainerFromALBSecurityGroup.id]
}


resource "aws_lb_listener" "lb-listener" {

  load_balancer_arn = aws_lb.server-lb.arn
  protocol          = "HTTP"
  port              = "80"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.server-lb-target-group.arn
  }
}


///////



resource "aws_lb_target_group" "client-lb-target-group" {
  name        = "client-tg"
  target_type = "ip"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.my_vpc.id

  health_check {
    path = "/"
  }
}

resource "aws_lb" "client-lb" {
  name               = "client-alb"
  internal           = false
  ip_address_type    = "ipv4"
  load_balancer_type = "application"
  subnets            = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
  security_groups    = [aws_security_group.ContainerFromALBSecurityGroup.id]
}


resource "aws_lb_listener" "client-lb-listener" {

  load_balancer_arn = aws_lb.client-lb.arn
  protocol          = "HTTP"
  port              = "80"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.client-lb-target-group.arn
  }
}

terraform {
  backend "s3" {}
}
