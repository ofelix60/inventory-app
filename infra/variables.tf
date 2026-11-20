variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "image_tag" {
  description = "Image tag to deploy, e.g. sha-1a2b3c4 (built by the CI workflow)"
  type        = string

  validation {
    condition     = can(regex("^sha-[0-9a-f]{7,40}$", var.image_tag))
    error_message = "image_tag must be a commit tag like sha-1a2b3c4, not main or latest."
  }
}
