
provider "aws" {
  region = "us-east-1"
}


resource "aws_ecs_cluster" "MyCluster" {
  name = "MyCluster"
}

resource "aws_ecs_service" "app-container-service" {
  launch_type     = "FARGATE"
  name            = "app-container-service"
  cluster         = aws_ecs_cluster.MyCluster.id
  task_definition = aws_ecs_task_definition.app-task-definition.arn
  desired_count   = 1


  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
  }


  # load_balancer {
  #   target_group_arn = aws_lb_target_group.lb-target-group.id
  #   container_name   = "client"
  #   container_port   = 3000
  # }
  # depends_on = [
  #   aws_lb_listener.lb-listener
  # ]
}


resource "aws_ecs_task_definition" "app-task-definition" {
  family                   = "app-task-definition"
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
      {"name": "NODE_ENV","value": "N/A"}
    ]
  },
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
      {"name": "SECRET","value": "qwerty"},
      {"name": "CLIENT_URL","value": "http://localhost:3000"},
      {"name": "DATABASE_URL","value": "somelink.com"}
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


# TARGET GROUP
# resource "aws_lb_target_group" "lb-target-group" {
#   # name        = "lb-target-group"
#   # depends_on  = [aws_vpc.my_vpc]
#   # target_type = "ip"
#   # port        = 80
#   # protocol    = "HTTP"
#   # vpc_id      = aws_vpc.my_vpc.id

#   # health_check {
#   #   enabled             = true
#   #   protocol            = "HTTP"
#   #   path                = "/"
#   #   port                = 3000
#   #   interval            = 10
#   #   timeout             = 5
#   #   healthy_threshold   = 5
#   #   unhealthy_threshold = 2
#   # }

#   # lifecycle {
#   #   create_before_destroy = true
#   # }
#   name        = "client-container-target-group"
#   port        = 3000
#   protocol    = "HTTP"
#   vpc_id      = aws_vpc.my_vpc.id
#   target_type = "ip"
# }


# LOAD BALANCER
# resource "aws_lb" "app-load-balancer" {
#   # name     = "app-load-balancer"
#   # internal = false
#   # # ip_address_type    = "ipv4"
#   # load_balancer_type = "application"
#   # security_groups    = [aws_security_group.ApplicationLoadBalancerSecurityGroup.id]
#   # subnets            = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]

#   # tags = {
#   #   "Name" = "Application load balancer"
#   # }

#   name               = "app-container-load-balancer"
#   internal           = false
#   load_balancer_type = "application"
#   security_groups    = [aws_security_group.ContainerFromALBSecurityGroup.id]
#   subnets            = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
# }

#  CREATING LISTENER
# resource "aws_lb_listener" "lb-listener" {
#   # load_balancer_arn = aws_lb.app-load-balancer.arn
#   # protocol          = "HTTP"
#   # port              = 80

#   # default_action {
#   #   type             = "forward"
#   #   target_group_arn = aws_lb_target_group.lb-target-group.id
#   # }

#   load_balancer_arn = aws_lb.app-load-balancer.arn
#   protocol          = "HTTP"
#   port              = "80"
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.lb-target-group.arn
#   }
# }

# resource "aws_security_group" "ApplicationLoadBalancerSecurityGroup" {
#   name        = "ApplicationLoadBalancerSecurityGroup"
#   description = "Inbound traffic Port 80 from anywhere"
#   vpc_id      = aws_vpc.my_vpc.id

#   ingress {
#     # type        = "HTTP"
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   tags = {
#     "Name" = "load balancer security group"
#   }
# }


resource "aws_security_group" "ContainerFromALBSecurityGroup" {
  # name        = "security-group"
  # description = "Inbound traffic from ApplicationLoadBalancerSecurityGroup"
  vpc_id = aws_vpc.my_vpc.id

  # ingress {
  #   # type      = "tcp"
  #   from_port       = 0
  #   to_port         = 0
  #   protocol        = "tcp"
  #   cidr_blocks     = ["0.0.0.0/0"]
  #   security_groups = [aws_security_group.ApplicationLoadBalancerSecurityGroup.id]
  # }

  name        = "security_group"
  description = "Allow traffic to the client container"

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
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

