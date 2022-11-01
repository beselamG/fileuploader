import axios from "axios";

export const createContainer =async (containerName) => {
    try {
        
        const body = { containerName: containerName };
        const url = "http://localhost:3001/container"
        const  response = await axios.post(url, body)
        alert(JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
}