resource "azurerm_key_vault" "kv" {
name = var.key_vault_name
location = var.location
resource_group_name = var.resource_group_name
sku_name = "standard"
tenant_id = var.tenant_id
}