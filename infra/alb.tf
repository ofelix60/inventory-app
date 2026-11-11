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
  security_groups    = [aws_security_group.alb.id]
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
  security_groups    = [aws_security_group.alb.id]
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
