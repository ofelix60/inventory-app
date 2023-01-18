provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "clustercluster" {
  name = "clustercluster"
}

resource "aws_ecs_service" "app-container-service" {
  launch_type     = "FARGATE"
  name            = "app-container-service"
  cluster         = aws_ecs_cluster.clustercluster.id
  task_definition = aws_ecs_task_definition.app-task-definition.arn
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
  }


  load_balancer {
    target_group_arn = aws_lb_target_group.tg.arn
    container_name   = "server"
    container_port   = 8000
  }
}

resource "aws_ecs_task_definition" "app-task-definition" {
  family                   = "app-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
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
        "containerPort": 3000
      }
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
    "environment": [
     
    ]
  }
]
EOF

  depends_on = [aws_internet_gateway.gw]
}




data "aws_iam_policy_document" "ecs_tasks_execution_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "THIS-ONE-ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_execution_role_policy.json
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}




resource "aws_lb" "app-lb" {
  name            = "app-lb"
  internal        = false
  security_groups = [aws_security_group.security-group.id]
  subnets         = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
}

resource "aws_lb_target_group" "tg" {
  name        = "tg"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.my_vpc.id
  target_type = "ip"
  health_check {
    path                = "/"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
    matcher             = "200-299"
  }
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_lb.app-lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.tg.arn
    type             = "forward"
  }
}


resource "aws_security_group" "security-group" {
  name        = "security-group"
  description = "Allow incoming traffic on port 80"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
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
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Main VPC"
  }
}

resource "aws_subnet" "subnet_a" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "subnet_b" {
  vpc_id                  = aws_vpc.my_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}


resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.my_vpc.id

  tags = {
    Name = "THEgateway"
  }
}


resource "aws_route_table" "example" {
  vpc_id = aws_vpc.my_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "example-gw"
  }
}


resource "aws_route_table_association" "subnet_a" {
  subnet_id      = aws_subnet.subnet_a.id
  route_table_id = aws_route_table.example.id
}

resource "aws_route_table_association" "subnet_b" {
  subnet_id      = aws_subnet.subnet_b.id
  route_table_id = aws_route_table.example.id
}

