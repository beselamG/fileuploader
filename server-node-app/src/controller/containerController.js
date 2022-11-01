const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = "beseassess";

const getContainers = async (req, res) => {
  try {
    let containerList = [];
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );

    let containers = blobServiceClient.listContainers();
    let containerItem = await containers.next();
    while (!containerItem.done) {
      console.log(`${containerItem.value.name}`);
      containerList.push(containerItem.value.name);
      containerItem = await containers.next();
    }
    res.send({ data: containerList, error: false, message: "" });
  } catch (error) {
    res.status(400).send({ data: "", error: "Something went wrong!" });
  }
};

const createContainer = async (req, res) => {
  try {
    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );

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
