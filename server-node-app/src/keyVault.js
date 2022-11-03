const azKeyvault = require('@azure/keyvault-secrets')
const { BlobServiceClient } = require('@azure/storage-blob')
const { DefaultAzureCredential } = require('@azure/identity')

const keyVaultClient = new azKeyvault.SecretClient(
  'https://fileuploaderassmkeyvault.vault.azure.net/',
  new DefaultAzureCredential()
)

const getBlobService = async function () {
  const storageAccountName = (await keyVaultClient.getSecret('STOR-ACCOUNT'))
    .value
  //  const accountKey = (await keyVaultClient.getSecret('SHARED-KEY')).value;

  const blobServiceClientt = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  )

  return blobServiceClientt
}

module.exports = { getBlobService }
