resource "aws_security_group" "alb" {
  name        = "alb-sg"
  description = "Public HTTP into the load balancers"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    description = "HTTP from anywhere"
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

resource "aws_security_group" "containers" {
  name        = "containers-sg"
  description = "Only the load balancers may reach the containers"
  vpc_id      = aws_vpc.my_vpc.id

  ingress {
    description     = "Client from ALB"
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id] # source: the ALB group, not an IP range
  }

  ingress {
    description     = "Server from ALB"
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    description = "Outbound (image pulls, external DB)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
