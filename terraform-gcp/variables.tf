variable "project_id" {
  description = "The ID of the Google Cloud project"
  type        = string
  default     = "sairilab-musichub"
}

variable "region" {
  description = "The region to deploy the resources"
  type        = string
  default     = "asia-northeast1"
}

variable "zone" {
  description = "The zone to deploy the resources"
  type        = string
  default     = "asia-northeast1-a"
}
