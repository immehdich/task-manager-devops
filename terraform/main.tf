data "azurerm_client_config" "current" {}

data "azurerm_resource_group" "rg" {
name = var.resource_group_name
}

module "vnet" {
source = "./modules/vnet"
vnet_name = var.vnet_name
location = data.azurerm_resource_group.rg.location
resource_group_name = data.azurerm_resource_group.rg.name
}

module "aks" {
source = "./modules/aks"
aks_cluster_name = var.aks_cluster_name
location = data.azurerm_resource_group.rg.location
resource_group_name = data.azurerm_resource_group.rg.name
node_count = var.node_count
vm_size = var.vm_size
aks_subnet_id = module.vnet.aks_subnet_id
}

module "acr" {
source = "./modules/acr"
acr_name = var.acr_name
location = data.azurerm_resource_group.rg.location
resource_group_name = data.azurerm_resource_group.rg.name
}

module "storage" {
source = "./modules/storage"
storage_account_name = var.storage_account_name
location = data.azurerm_resource_group.rg.location
resource_group_name = data.azurerm_resource_group.rg.name
}

module "keyvault" {
source = "./modules/keyvault"
key_vault_name = var.key_vault_name
location = data.azurerm_resource_group.rg.location
resource_group_name = data.azurerm_resource_group.rg.name
tenant_id = data.azurerm_client_config.current.tenant_id
}
