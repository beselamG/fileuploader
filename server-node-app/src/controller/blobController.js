const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = "beseassess";

const multer = require("multer");
const { getBlobService } = require("../keyVault");
let upload = multer().single("file");

const getBlobs = async (req, res) => {
  try {
    const blobs = [];
    const blobServiceClient = await getBlobService()

    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
      const containerClient = blobServiceClient.getContainerClient(
        container.name
      );
      const blobList = containerClient.listBlobsFlat();

      for await (const blob of blobList) {
        const blobClient = containerClient.getBlobClient(blob.name);
        blobs.push({
          blobName: blob.name,
          containerName: container.name,
          url: blobClient.url,
        });
      }
    }
    res.send({ data: blobs, error: false, message: "" });
  } catch (error) {
    res.status(400).send({ data: null, error: "Something went wrong!" });
  }
};

const getBlobsWithVersions = async (req, res) => {
    try {
      const blobs = [];
      const blobServiceClient =  await getBlobService()
  
      let containers = blobServiceClient.listContainers();
      for await (const container of containers) {
        const containerClient = blobServiceClient.getContainerClient(
          container.name
        );
        const blobList = containerClient.listBlobsFlat({ includeVersions: true });
  
        for await (const blob of blobList) {
          const blobClient = containerClient.getBlobClient(blob.name);
          blobs.push({
            blobName: blob.name,
            containerName: container.name,
            url: blobClient.url,
            versionId: blob.versionId,
          });
        }
      }
      res.send({ data: blobs, error: false, message: "" });
    } catch (error) {
      res.status(400).send({ data: null, error: "Something went wrong!" });
    }
  };

const uploadBlobs = async (req, res) => {
  upload(req, res, (err) => {
    if (req.file != undefined) {
      const containerName = req.body.containerName;
      const file = req.file.buffer;
      const fileName = req.file.originalname;
      blobUploader(res, fileName, file, containerName);
    } else {
      res.status(400).send({ data: null, error: "Something went wrong!" });
    }
  });
};

const blobUploader = async (res, fileName, file, containerName) => {
  try {
    const blobServiceClient =  await getBlobService()
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

module.exports = { getBlobs, uploadBlobs , getBlobsWithVersions};
