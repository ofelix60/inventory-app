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
    container_port   = 80
  }

  depends_on = [
    aws_lb_listener.client-lb-listener
  ]

  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.containers.id]
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
    security_groups  = [aws_security_group.containers.id]
  }
}

locals {
  image_repo = "ghcr.io/ofelix60/inventory-app"
}

resource "aws_ecs_task_definition" "client-task-definition" {
  family                   = "client-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name   = "client"
    image  = "${local.image_repo}_client:${var.image_tag}"
    memory = 2048
    cpu    = 512

    portMappings = [{ containerPort = 80, protocol = "tcp" }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = aws_cloudwatch_log_group.app.name
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "client"
      }
    }
  }])
}

resource "aws_ecs_task_definition" "server-task-definition" {
  family                   = "server-task-definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 1024
  memory                   = 2048
  task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([{
    name   = "server"
    image  = "${local.image_repo}_server:${var.image_tag}"
    memory = 2048
    cpu    = 512

    portMappings = [{ containerPort = 8000, protocol = "tcp" }]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        awslogs-group         = aws_cloudwatch_log_group.app.name
        awslogs-region        = var.aws_region
        awslogs-stream-prefix = "server"
      }
    }

    environment = [
      { name = "CLIENT_URL", value = "http://${aws_lb.client-lb.dns_name}" },
    ]

    secrets = [
      { name = "SECRET", valueFrom = aws_ssm_parameter.jwt_secret.arn },
      { name = "DATABASE_URL", valueFrom = aws_ssm_parameter.database_url.arn },
    ]
  }])
}
