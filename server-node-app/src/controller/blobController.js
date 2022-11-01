
const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const defaultAzureCredential = new DefaultAzureCredential();

const  multer = require('multer');
let upload = multer().single('file');

 const getBlobs = async (req,res) => {
    res.send("blob listed")
}

 const uploadBlobs = async (req,res) => {
 upload(req, res , err => { 
    const containerName = "classss"
    const file = req.file.buffer
    const name = req.file.originalname
      mm(res, name, file,containerName)
   })
}

const mm = async (res,name,file,containerName) => {
     try {
            const accountName = "beseassess"

    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net`,
        new DefaultAzureCredential()
    );
     const containerClient = blobServiceClient.getContainerClient(containerName);
         await containerClient.createIfNotExists();
        const blockBlobClient = containerClient.getBlockBlobClient(name);
        const uploadBlobResponse = await blockBlobClient.upload(file, file.length);
        console.log(`Upload block blob ${name} successfully`, uploadBlobResponse.requestId);
        res.send("sucessfull")
    } catch (error) {
        console.log(error);
        res.status(400).send('Something went wrong!');
    }
}


module.exports = {getBlobs,uploadBlobs}