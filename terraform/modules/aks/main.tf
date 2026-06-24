resource "azurerm_kubernetes_cluster" "aks" {
  name = var.aks_cluster_name
  location = var.location
  resource_group_name = var.resource_group_name
  dns_prefix = "devops-aks"

default_node_pool {
  name = "default"
  node_count = var.node_count
  vm_size = var.vm_size
  vnet_subnet_id = var.aks_subnet_id

  upgrade_settings {
    max_surge = "10%"
  }
}

identity {
  type = "SystemAssigned"
}

  network_profile {
    network_plugin = "azure"
    network_policy = "azure"
  }
}
