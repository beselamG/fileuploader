import axios from "axios";

export const uploadBlob = async (containerName, blobContents) => {
  try {
    const formData = new FormData();
    formData.append("file", blobContents);
    formData.append("containerName", containerName);
    formData.append("fileName", blobContents.name);

    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API}/blob`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert(JSON.stringify(response.data));
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const getBlobs = async () => {
  try {
    const url = `${process.env.REACT_APP_API}/blob`;
    const response = await axios.get(url);
    const containers = response.data.data;
    return { data: containers, error: false, message: "" };
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const getBlobsWithVersions = async () => {
    try {
       
      const url = `${process.env.REACT_APP_API}/blob/withVersion` ;
      const response = await axios.get(url);
      const containers = response.data.data;
      return { data: containers, error: false, message: "" };
    } catch (error) {
      alert("somthing went wrong");
    }
  };
  
