# Who can assume these roles: ECS tasks, and nothing else.
data "aws_iam_policy_document" "ecs_tasks_assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

# Execution role: used by ECS itself to pull images, write logs and fetch secrets.
resource "aws_iam_role" "ecs_task_execution_role" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume.json
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Lets ECS fetch the two app secrets when it starts a task, and nothing else.
resource "aws_iam_role_policy" "read_app_secrets" {
  name = "read-app-secrets"
  role = aws_iam_role.ecs_task_execution_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["ssm:GetParameters"]
      Resource = [
        aws_ssm_parameter.jwt_secret.arn,
        aws_ssm_parameter.database_url.arn,
      ]
    }]
  })
}

# Task role: used by the app code inside the container. It calls no AWS APIs, so it gets no policies.
resource "aws_iam_role" "ecs_task_role" {
  name               = "inventory-app-task"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume.json
}
