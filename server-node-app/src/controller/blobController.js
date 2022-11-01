const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = "beseassess";

const multer = require("multer");
let upload = multer().single("file");

const getBlobs = async (req, res) => {
  res.send("blob listed");
};

const uploadBlobs = async (req, res) => {
  upload(req, res, (err) => {
    if (req.file != undefined) {
      const containerName = req.body.containerName;
      const file = req.file.buffer;
      const fileName = req.file.originalname;
      blobUploader(res, fileName, file, containerName);
    } else {
      res.status(400).send({ data: null, error: "file not available" });
    }
  });
};

const blobUploader = async (res, fileName, file, containerName) => {
  try {
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.upload(file, file.length);
    res.send({ data: "successfull", error: false });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: null, error: "Something went wrong!" });
  }
};

module.exports = { getBlobs, uploadBlobs };
