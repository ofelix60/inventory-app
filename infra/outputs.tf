output "server_alb_dns_name" {
  description = "Public DNS name of the server load balancer"
  value       = aws_lb.server-lb.dns_name
}

output "client_alb_dns_name" {
  description = "Public DNS name of the client load balancer"
  value       = aws_lb.client-lb.dns_name
}
