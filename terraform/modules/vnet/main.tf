resource "azurerm_virtual_network" "vnet" {
  name     = var.vnet_name
  location = var.location
  resource_group_name = var.resource_group_name
  address_space = ["10.0.0.0/8"]
}

resource "azurerm_subnet" "aks_subnet" {
  name = "AKSNodeSubnet"
  resource_group_name = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = ["10.240.0.0/16"]
}

resource "azurerm_subnet" "appgw_subnet" {
  name = "AppGwSubnet"
  resource_group_name = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = ["10.241.0.0/16"]
}