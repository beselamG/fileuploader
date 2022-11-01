import axios from "axios";

export const uploadBlob = async (containerName, blobContents) => {
  try {
    const formData = new FormData();
    formData.append("file", blobContents);
    formData.append("containerName", containerName);
    formData.append("fileName", blobContents.name);

    const response = await axios({
      method: "post",
      url: "http://localhost:3001/blob",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};
