import axios from 'axios';

 export const  uploadBlob = async ( containerName,blobContents) => {
    let formData = new FormData();
    formData.append('file', blobContents);
    formData.append('containerName', containerName);
    formData.append('fileName', blobContents.name);

    await axios({
        method: 'post',
        url: 'http://localhost:3001/blob',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then((response) => {
        alert(JSON.stringify(response.data));
      });

}