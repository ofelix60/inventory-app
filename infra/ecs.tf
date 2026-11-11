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
      {"name": "DATABASE_URL","value": ""}
    ]
  }
]
EOF
}
