resource "google_cloud_run_service" "default" {
  name     = "hello-cloud-run"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/hello-cloud-run"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "public" {
  project  = google_cloud_run_service.default.project
  location = google_cloud_run_service.default.location
  service  = google_cloud_run_service.default.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}

output "service_url" {
  value = google_cloud_run_service.default.status[0].url
}
