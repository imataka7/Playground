provider "google" {
  credentials = file("./sairilab-musichub-9cba453935fb.json")
  project     = var.project_id
  region      = var.region
}
