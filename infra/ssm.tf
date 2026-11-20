# Terraform generates the JWT signing key, so nobody types or commits it.
resource "random_password" "jwt_secret" {
  length  = 64
  special = false
}

resource "aws_ssm_parameter" "jwt_secret" {
  name  = "/inventory-app/jwt-secret"
  type  = "SecureString"
  value = random_password.jwt_secret.result
}

# Created with a placeholder; the real URL is set after inital deploy
resource "aws_ssm_parameter" "database_url" {
  name  = "/inventory-app/database-url"
  type  = "SecureString"
  value = "UPDATE_VALUE"

  lifecycle {
    ignore_changes = [value]
  }
}

