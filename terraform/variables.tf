variable "resource_group_name" {
  description = "Resource Group name"
  type = string
  default = "1-7838b5c8-playground-sandbox"
}

variable "vnet_name" {
  description = "Virtual Network name"
  type = string
  default = "vnet-devops"
}

variable "aks_cluster_name" {
  description = "AKS cluster name"
  type = string
  default = "aks-devops-cluster"
}

variable "acr_name" {
  description = "Azure Container Registry name"
  type = string
  default = "acrdevops20261"
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

variable "storage_account_name" {
  description = "Storage account name"
  type = string
  default = "tfstate20261abc"
}

variable "key_vault_name" {
  description = "Key Vault name"
  type = string
  default = "kv-devops67890"
}
