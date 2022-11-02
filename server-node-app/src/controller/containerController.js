const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");
const { getBlobService } = require("../keyVault");

const accountName = "beseassess";

const getContainers = async (req, res) => {
  try {
    let containerList = [];
    const blobServiceClient =  await getBlobService()

    let containers = blobServiceClient.listContainers();
    for await (const container of containers) {
       containerList.push(container.name)
      }
    res.send({ data: containerList, error: false, message: "" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: "", error: "Something went wrong!" });
  }
};

const createContainer = async (req, res) => {
  try {
    const blobServiceClient =  await getBlobService()

    const containerClient = blobServiceClient.getContainerClient(
      req.body.containerName
    );
    const containerExits = await containerClient.exists();
    if (containerExits) {
      res.send({
        data: null,
        error: true,
        message: "container name is already existed",
      });
    } else {
      await containerClient.create();
      res.send({ data: "container created", error: false, message: "" });
    }
  } catch (error) {
    res.status(400).send({ data: "", error: "Something went wrong!" });
  }
};

module.exports = { getContainers, createContainer };
