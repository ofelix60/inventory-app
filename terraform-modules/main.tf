
provider "aws" {
  region = "us-east-1"

}


resource "aws_ecs_cluster" "MyCluster" {
  name = "MyCluster"
}

# ONE SERVICE VERSION
# resource "aws_ecs_service" "app-container-service" {
#   launch_type             = "FARGATE"
#   name                    = "app-container-service"
#   cluster                 = aws_ecs_cluster.MyCluster.id
#   task_definition         = aws_ecs_task_definition.app-task-definition.arn
#   desired_count           = 1
#   enable_ecs_managed_tags = true
#   propagate_tags          = "TASK_DEFINITION"


#   network_configuration {
#     subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
#     assign_public_ip = true
#     security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
#   }

#   service_registries {
#     registry_arn = aws_service_discovery_service.discovery_service.arn
#     # port         = 8000
#   }

#   # service {
#   #   port_name      = "containerPort"
#   #   discovery_name = "my-custom-name"
#   # }

#   # load_balancer {
#   #   target_group_arn = aws_lb_target_group.lb-target-group.id
#   #   container_name   = "client"
#   #   container_port   = 3000
#   # }
#   # depends_on = [
#   #   aws_lb_listener.lb-listener
#   # ]
# }

# two services v one
resource "aws_ecs_service" "client-container-service" {
  launch_type     = "FARGATE"
  name            = "client-container-service"
  cluster         = aws_ecs_cluster.MyCluster.id
  task_definition = aws_ecs_task_definition.client-task-definition.arn
  desired_count   = 1


  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
  }


  # service_registries {
  #   registry_arn = aws_service_discovery_service.client_discovery_service.arn
  #   # port         = 8000
  # }
  # service {
  #   port_name      = "containerPort"
  #   discovery_name = "my-custom-name"
  # }

  # load_balancer {
  #   target_group_arn = aws_lb_target_group.lb-target-group.id
  #   container_name   = "client"
  #   container_port   = 3000
  # }
  # depends_on = [
  #   aws_lb_listener.lb-listener
  # ]
}

resource "aws_ecs_service" "server-container-service" {
  launch_type     = "FARGATE"
  name            = "server-container-service"
  cluster         = aws_ecs_cluster.MyCluster.id
  task_definition = aws_ecs_task_definition.server-task-definition.arn
  desired_count   = 1


  network_configuration {
    subnets          = [aws_subnet.subnet_a.id, aws_subnet.subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.ContainerFromALBSecurityGroup.id]
  }

  service_registries {
    registry_arn = aws_service_discovery_service.server_discovery_service.arn
    # port         = 8000
  }

  # service {
  #   port_name      = "containerPort"
  #   discovery_name = "my-custom-name"
  # }

  # load_balancer {
  #   target_group_arn = aws_lb_target_group.lb-target-group.id
  #   container_name   = "client"
  #   container_port   = 3000
  # }
  # depends_on = [
  #   aws_lb_listener.lb-listener
  # ]
}

# ONE SERVICE CONFIG
# resource "aws_ecs_task_definition" "app-task-definition" {
#   family                   = "app-task-definition"
#   network_mode             = "awsvpc"
#   requires_compatibilities = ["FARGATE"]
#   cpu                      = 1024
#   memory                   = 2048
#   task_role_arn            = aws_iam_role.ecs_task_execution_role.arn
#   execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
#   container_definitions    = <<EOF
# [
#   {
#     "name": "client",
#     "image": "ghcr.io/ofelix60/inventory-app_client:main",
#     "memory": 2048,
#     "cpu": 512,
#     "networkMode": "awsvpc",
#     "portMappings": [
#       {
#         "containerPort": 3000,
#         "protocol": "tcp"
#       }
#     ],
#     "logConfiguration": {
#                 "logDriver": "awslogs",
#                 "options": {
#                     "awslogs-group": "firelens-container",
#                     "awslogs-region": "us-west-2",
#                     "awslogs-create-group": "true",
#                     "awslogs-stream-prefix": "firelens"
#                 }
#       }
#   },
#   {
#     "name": "server",
#     "image": "ghcr.io/ofelix60/inventory-app_server:main",
#     "memory": 2048,
#     "cpu": 512,
#     "networkMode": "awsvpc",
#     "portMappings": [
#       {
#         "containerPort": 8000,
#         "protocol": "tcp"
#       }
#     ],
#     "logConfiguration": {
#                 "logDriver": "awslogs",
#                 "options": {
#                     "awslogs-group": "firelens-container",
#                     "awslogs-region": "us-west-2",
#                     "awslogs-create-group": "true",
#                     "awslogs-stream-prefix": "firelens"
#                 }
#       },
#         "environment": [
#       {"name": "PORT","value": "8000"},
#       {"name": "PGUSER","value": "ofelix60"},
#       {"name": "PGHOST","value": "ep-late-limit-066898.us-west-2.aws.neon.tech"},
#       {"name": "PG_PORT","value": "5432"},
#       {"name": "PGDATABASE","value": "neondb"},
#       {"name": "PGPASSWORD","value": "Y4oan0zFXPqC"},
#       {"name": "PG_DIALECT","value": "postgres"},
#       {"name": "SECRET","value": "qwerty"},
#       {"name": "CLIENT_URL","value": "http://localhost:3000"},
#       {"name": "DATABASE_URL","value": "postgres://ofelix60:Y4oan0zFXPqC@ep-late-limit-066898.us-west-2.aws.neon.tech/neondb"}
#     ]
#   }
# ]
# EOF
# }


# TWO SERVICE CONFIG
# (add hostport:3000)
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
      {"name": "REACT_APP_BASEURL","value": "svc-discovery-endpoint.server:8000/api/"}
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
      }
  }
]
EOF
}

# {"name": "CLIENT_URL","value": "svc-discovery-endpoint.client:3000"},

# ,
#   {
#     "name": "service-discovery",
#     "image": "amazon/aws-service-discovery-ecs-agent:latest",
#     "environment": [
#      {"name": "SERVICE_NAME", "value": "MY-SERVICE-NAME"},
#      {"name": "NAMESPACE", "value": "MY-NAMESPACE"}
#     ]
#   }

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

/////
# server
resource "aws_service_discovery_private_dns_namespace" "server-private-dns-namespace" {
  name        = "server"
  description = "server-namespace"
  vpc         = aws_vpc.my_vpc.id
}

resource "aws_service_discovery_service" "server_discovery_service" {
  name = "svc-discovery-endpoint"
  # namespace_id = "ns-foobar"

  dns_config {
    namespace_id   = aws_service_discovery_private_dns_namespace.server-private-dns-namespace.id
    routing_policy = "MULTIVALUE"

    dns_records {
      ttl  = 5
      type = "A"
    }
    # dns_records {
    #   ttl  = 5
    #   type = "SRV"
    # }
  }
  health_check_custom_config {
    failure_threshold = 1
  }
}

# client

# resource "aws_service_discovery_private_dns_namespace" "client-private-dns-namespace" {
#   name        = "client"
#   description = "client-namespace"
#   vpc         = aws_vpc.my_vpc.id
# }

# resource "aws_service_discovery_service" "client_discovery_service" {
#   name = "svc-discovery-endpoint"
#   # namespace_id = "ns-foobar"

#   dns_config {
#     namespace_id   = aws_service_discovery_private_dns_namespace.client-private-dns-namespace.id
#     routing_policy = "MULTIVALUE"

#     dns_records {
#       ttl  = 5
#       type = "A"
#     }
#     # dns_records {
#     #   ttl  = 5
#     #   type = "SRV"
#     # }
#   }
#   health_check_custom_config {
#     failure_threshold = 1
#   }
# }


///////

# resource "aws_ecs_task_definition" "example" {
#   # Other task definition properties here

#   container_definitions = <<EOF
# [
#   {
#     # Application containers here
#   },
#   {
#     name = "service-discovery"
#     image = "amazon/aws-service-discovery-ecs-agent:latest"
#     environment {
#       SERVICE_NAME = "${var.service_name}"
#       NAMESPACE = "${var.namespace}"
#     }
#     privileged = true
#   }
# ]
# EOF
# }


# const AWS = require('aws-sdk');

# const servicediscovery = new AWS.ServiceDiscovery();

# const params = {
#   NamespaceName: 'your-namespace-name',
#   ServiceName: 'your-service-name'
# };

# servicediscovery.discoverInstances(params, (err, data) => {
#   if (err) {
#     console.log(err, err.stack);
#   } else {
#     console.log(data);
#     /*
#     data: {
#       Instances: [
#         {
#           Attributes: {
#             key1: 'value1',
#             key2: 'value2',
#             ...
#           },
#           InstanceId: 'string',
#           ServiceName: 'string'
#         },
#         ...
#       ]
#     }
#     */
#   }
# });
