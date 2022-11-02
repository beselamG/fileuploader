param location string = resourceGroup().location
param kvName string
param objectId string 
param tenantId string 
param storageAccountName string
param frontWebApp string 
param backendWebApp string 
param appInsightFront string 
param appInsightBackend string

module keyVault 'module/keyvault.bicep' = {
  name: 'keuvault'
  params: {
    location:location
    name: kvName
    objectIdB:objectId 
    tenantId: tenantId
  }
}
 
module storageAccount 'module/storage_standard.bicep' = {
  name: 'fileUploaderstorage'
  params: {
    storageName:storageAccountName
    location: location
    sku: {
      name: 'Standard_LRS'
      tier: 'Standard'
    }

  }
  dependsOn:[keyVault]
}

resource srorageAccountNameSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {

  name: '${kvName}/STOR-ACCOUNT'
  properties: {
    value: storageAccount.outputs.storageAccountName
  }
  dependsOn:[storageAccount]
}

module appInsightFrontend 'module/appInsight.bicep' = {
  name: 'appInsightFron'
  params: {
    name:appInsightFront
    location: location
  }
}
module appInsightBack 'module/appInsight.bicep' = {
  name: 'appInsightBack'
  params: {
    name:appInsightBackend
    location: location
  }
}

module webAppServicePlan 'module/appServicePlan.bicep' = {
  name: 'appServicePlan'
  params: {
    location: location
    sku: {
      name: 'P1v2'
      tier: 'PremiumV2'
      size: 'P1v2'
      family: 'Pv2'
      capacity: 1
    }

  }
  dependsOn:[storageAccount]
}

module webAppBack 'module/webAppService.bicep' = {
  name: 'backendWebApp'
  params: {
    appServicePlanId: webAppServicePlan.outputs.apsId
    location: location
    name: backendWebApp
    appSiteConfig: [
      {
        name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
        value: appInsightBack.outputs.instrumentationKey
      }
      {
        name: 'WEBSITE_NODE_DEFAULT_VERSION'
        value: '~16'
      }
    ]
  }
}

module webAppFront 'module/webAppService.bicep' = {
  name: 'frontendWebApp'
  params: {
    appServicePlanId: webAppServicePlan.outputs.apsId
    location: location
    name: frontWebApp
    appSiteConfig: [
      {
        name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
        value: appInsightFrontend.outputs.instrumentationKey
      }
      {
        name: 'WEBSITE_NODE_DEFAULT_VERSION'
        value: '~16'
      }
      {
        name:'REACT_APP_API'
        value:'https://${webAppBack.outputs.name}.azurewebsites.net'
      }
    ]
  }
  dependsOn:[webAppBack,appInsightFrontend]
}


