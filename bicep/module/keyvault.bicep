@description('location for the resource')
param location string = resourceGroup().location

@description('name of the resource')
param name string 

@description('tenant id ')
param tenantId string 

@description('object id for user name B')
param objectIdB string 

@description('object id for an app')
param objectIdApp string 


resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' = {
  name: name
  location: location
  properties: {
    enabledForDeployment: true
    enabledForTemplateDeployment: true
    enabledForDiskEncryption: true
    enableSoftDelete: false
    enablePurgeProtection: true
    tenantId: tenantId
    accessPolicies: [
      {
        tenantId: tenantId
        objectId: objectIdB
        permissions: {
          keys: [
            'all'
          ]
          secrets: [
            'all'
          ]
          certificates: [
            'all'
          ]
        }
      }
      {
        tenantId: tenantId
        objectId: objectIdApp
        permissions: {
          keys: [
            'get'
            'list'
          ]
          secrets: [
            'get'
            'list'
          ]
          certificates: [
            'get'
            'list'
          ]
        }
      }
      
    ]
    sku: {
      name: 'standard'
      family: 'A'
    }
  }
}

output name string = keyVault.name
