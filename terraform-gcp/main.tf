resource "google_compute_instance" "vm_instance" {
  name         = "my-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-10"
    }
  }

  network_interface {
    network = "default"

    access_config {

    }
  }
}
