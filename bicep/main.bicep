param location string = resourceGroup().location
param kvName string
param objectId string
param objectIdApp string
param tenantId string
param storageAccountName string
param funcStorageAccountName string
param frontWebApp string
param backendWebApp string
param appInsightFront string
param appInsightBackend string
param appConfigName string
param appInsightFunction string
param functionAppName string

resource appConfigStore 'Microsoft.AppConfiguration/configurationStores@2022-05-01' = {
  location: location
  properties: {
    encryption: {
    }
    disableLocalAuth: false

    softDeleteRetentionInDays: 7
    enablePurgeProtection: false
  }
  sku: {
    name: 'standard'
  }
  name: appConfigName
}

module keyVault 'module/keyvault.bicep' = {
  name: 'keuvault'
  params: {
    location: location
    name: kvName
    objectIdApp: objectIdApp
    objectIdB: objectId
    tenantId: tenantId
  }
}

module storageAccount 'module/storage_standard.bicep' = {
  name: 'fileUploaderstorage'
  params: {
    storageName: storageAccountName
    location: location
    sku: {
      name: 'Standard_LRS'
      tier: 'Standard'
    }

  }
  dependsOn: [ keyVault ]
}

resource srorageAccountNameSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = {

  name: '${kvName}/STOR-ACCOUNT'
  properties: {
    value: storageAccount.outputs.storageAccountName
  }
  dependsOn: [ storageAccount ]
}

module appInsightFrontend 'module/appInsight.bicep' = {
  name: 'appInsightFron'
  params: {
    name: appInsightFront
    location: location
  }
}
module appInsightBack 'module/appInsight.bicep' = {
  name: 'appInsightBack'
  params: {
    name: appInsightBackend
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
  dependsOn: [ storageAccount ]
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

resource configStoreValueRcApi 'Microsoft.AppConfiguration/configurationStores/keyValues@2021-10-01-preview' = {
  name: 'REACT_APP_API'
  parent: appConfigStore
  properties: {
    contentType: 'string'
    value: 'https://${webAppBack.outputs.name}.azurewebsites.net'
  }
  dependsOn: [ webAppBack ]
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
        name: 'REACT_APP_API'
        value: 'https://${webAppBack.outputs.name}.azurewebsites.net'
      }
      {
        name: 'REACT_APP_APP_CONFIG_CON_ST'
        value: filter(appConfigStore.listKeys().value, k => k.name == 'Primary Read Only')[0].connectionString
      }
    ]
  }
  dependsOn: [ webAppBack, appInsightFrontend ]
}

resource configStoreValueRedApi 'Microsoft.AppConfiguration/configurationStores/keyValues@2021-10-01-preview' = {
  name: 'REACT_APP_REDIRECT'
  parent: appConfigStore
  properties: {
    contentType: 'string'
    value: 'https://${webAppFront.outputs.name}.azurewebsites.net'
  }
  dependsOn: [ webAppFront ]
}

module appServicePlanFunc 'module/appServicePlan.bicep' = {
  name: 'appServicePlanFunc'
  params: {
    name: 'backupFunAppPlan'
    location: location
    kind: 'functionapp'
    sku: {
      name: 'Y1'
      tier: 'Dynamic'
    }

  }

}

module appInsightFunc 'module/appInsight.bicep' = {
  name: 'appInsightFunc'
  params: {
    name: appInsightFunction
    location: location
  }
}

module storageAccountFunc 'module/storage_standard.bicep' = {
  name: 'fileUploaderFunStg'
  params: {
    storageName: funcStorageAccountName
    location: location
    sku: {
      name: 'Standard_LRS'
      tier: 'Standard'
    }

  }

}

module function 'module/function.bicep' = {
  dependsOn: [ appServicePlanFunc ]
  name: functionAppName
  params: {
    location: location
    appInsightKey: appInsightFunc.outputs.instrumentationKey
    appServicePlanId: appServicePlanFunc.outputs.apsId
    storageAccountConnString: storageAccountFunc.outputs.storageAccountConnString
  }
}
