output "resource_group_name" {
value = data.azurerm_resource_group.rg.name
}

output "vnet_name" {
value = module.vnet.vnet_name
}

output "aks_cluster_name" {
value = module.aks.aks_cluster_name
}

output "acr_login_server" {
value = module.acr.acr_login_server
}

output "acr_name" {
value = module.acr.acr_name
}

output "storage_account_name" {
value = module.storage.storage_account_name
}

output "key_vault_name" {
value = module.keyvault.key_vault_name
}
