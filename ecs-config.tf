# Configure the AWS provider
provider "aws" {
  region = "us-east-1"
}

# Create an ECS cluster
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "my-ecs-cluster"
}

# Create an ECS task definition for the frontend container
resource "aws_ecs_task_definition" "frontend" {
  family = "frontend"
  container_definitions = <<EOF
[
  {
    "name": "frontend",
    "image": "frontend:latest",
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ]
  }
]
EOF
}

# Create an ECS task definition for the backend container
resource "aws_ecs_task_definition" "backend" {
  family = "backend"
  container_definitions = <<EOF
[
  {
    "name": "backend",
    "image": "backend:latest",
    "portMappings": [
      {
        "containerPort": 8000,
        "hostPort": 8000
      }
    ]
  }
]
EOF
}

# Create an ECS service for the frontend container
resource "aws_ecs_service" "frontend" {
  name            = "frontend"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.frontend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.frontend.id]
    subnets         = [aws_subnet.public.*.id]
  }
}

# Create an ECS service for the backend container
resource "aws_ecs_service" "backend" {
  name            = "backend"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.backend.id]
    subnets         = [aws_subnet.private.*.id]
  }
}

# Create a security group for the frontend container
resource "aws_security_group" "frontend" {
  name        = "frontend"
  description = "Security group for the frontend container"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description = "Allow HTTP traffic"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
  }
}

# Create a security group for the backend container
resource "aws_security_group" "backend" {
  name        = "backend"
  description = "Security group for the backend container"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description = "Allow traffic from the frontend container"
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    source_security_group_id = aws_security_group.frontend.id
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Create a VPC
resource "aws_vpc" "vpc" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "my-vpc"
  }
}

# Create public subnets
resource "aws_subnet" "public" {
  count = 2
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.${count.index}.0/24"
  map_public_ip_on_launch = true
  availability_zone = "us-east-1a"

  tags = {
    Name = "public-${count.index}"
  }
}

# Create private subnets
resource "aws_subnet" "private" {
  count = 2
  vpc_id = aws_vpc.vpc.id
  cidr_block = "10.0.${count.index + 2}.0/24"
  map_public_ip_on_launch = false
  availability_zone = "us-east-1a"

  tags = {
    Name = "private-${count.index}"
  }
}

# Create a load balancer
resource "aws_alb" "alb" {
  name            = "my-alb"
  internal        = false
  security_groups = [aws_security_group.alb.id]
  subnets         = [aws_subnet.public.*.id]

  listener {
    port     = 80
    protocol = "HTTP"

    default_action {
      target_group_arn = aws_alb_target_group.frontend.arn
      type             = "forward"
    }
  }
}

# Create a security group for the load balancer
resource "aws_security_group" "alb" {
  name        = "alb"
  description = "Security group for the load balancer"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description = "Allow HTTP traffic"
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

# Create a target group for the frontend container
resource "aws_alb_target_group" "frontend" {
  name = "frontend"
  port = 3000
  protocol = "HTTP"
  vpc_id = aws_vpc.vpc.id
  health_check {
    path = "/health"
    interval = 30
    timeout = 5
    healthy_threshold = 2
    unhealthy_threshold = 2
  }
}

# Register the frontend container as a target in the target group
resource "aws_alb_target_group_attachment" "frontend" {
  target_group_arn = aws_alb_target_group.frontend.arn
  target_id = aws_ecs_service.frontend.load_balancer_target_group_arn
  port = 3000
}
