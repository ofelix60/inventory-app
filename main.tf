provider "aws" {
  region     = "us-east-1"
  access_key = "AKIAVTUBFXJTXJIHJMUI"
  secret_key = "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"

}

resource "aws_ecs_cluster" "default" {
  name = "default"
}

/////

# ecs task execution role
# generates an iam policy document in json format for the ecs task execution role
data "aws_iam_policy_document" "ecs_tasks_execution_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# create an iam role
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "THIS-ONE-ecs-task-execution-role"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_execution_role_policy.json
}

# attach ecs task execution policy to the iam role
resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}





resource "aws_ecs_task_definition" "app-task-definition" {
  family                   = "app-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  # execution_role_arn       = data.aws_iam_role.ecs_task_execution_role.arn
  container_definitions = <<EOF
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
      {"name": "PORT","value": "8000"},
      {"name": "PGUSER","value": "ofelix60"},
      {"name": "PGHOST","value": "ep-late-limit-066898.us-west-2.aws.neon.tech"},
      {"name": "PG_PORT","value": "5432"},
      {"name": "PGDATABASE","value": "neondb"},
      {"name": "PGPASSWORD","value": "HeL1piKaY7bW"},
      {"name": "PG_DIALECT","value": "postgres"},
      {"name": "SECRET","value": "qwerty"},
      {"name": "CLIENT_URL","value": "http://localhost:3000"},
      {"name": "DATABASE_URL","value": "postgres://ofelix60:HeL1piKaY7bW@ep-late-limit-066898.us-west-2.aws.neon.tech/neondb"}
    ]
  }
]
EOF
}
////
resource "aws_ecs_service" "app-container-service" {
  launch_type     = "FARGATE"
  name            = "app-container-service"
  cluster         = aws_ecs_cluster.default.id
  task_definition = aws_ecs_task_definition.app-task-definition.arn
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    # security_groups = [aws_security_group.security-group.id]
  }


  # load_balancer {
  #   target_group_arn = aws_lb_target_group.example.arn
  #   container_name   = "server"
  #   container_port   = 80
  # }
}
/////
# resource "aws_lb" "example" {
#   name               = "example"
#   internal           = false
#   load_balancer_type = "application"ple.id]
#   subnets            = [aws_subnet.subnet_a.id]
# }

# resource "aws_lb_target_group" "example" {
#   name        = "example"
#   port        = 80
#   protocol    = "HTTP"
#   target_type = "ip"
#   vpc_id      = aws_vpc.example.id
#   # load_balancer_arn = aws_lb.example.arn
# }

# resource "aws_security_group" "security-group" {
#   name        = "security-group"
#   description = "Allow incoming traffic on port 80"
#   vpc_id      = aws_vpc.example.id

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

# }
/////
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
  tags = {
    "Name" = "Main Subnet"
  }
}

resource "aws_subnet" "subnet_a" {
  vpc_id                  = aws_vpc.example.id
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "subnet_b" {
  vpc_id                  = aws_vpc.example.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}







