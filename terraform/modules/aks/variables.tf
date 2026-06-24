variable "aks_cluster_name" {
  description = "Name of the AKS cluster"
  type = string
}

variable "location" {
  description = "Azure region"
  type = string
}

variable "resource_group_name" {
  description = "Resource Group name"
  type = string
}

variable "node_count" {
  description = "Number of AKS nodes"
  type = number
  default = 2
}

variable "vm_size" {
  description = "VM size for AKS nodes"
  type = string
  default = "Standard_D2s_v3"
}

variable "aks_subnet_id" {
  description = "Subnet ID for AKS nodes"
  type = string
}
