# Both containers log here. Two week retention period
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/inventory-app"
  retention_in_days = 14
}
