import axios from "axios";

export const createContainer = async (containerName) => {
  try {
   
    const body = { containerName: containerName };
    const url = `${process.env.REACT_APP_API}/container`;
    const response = await axios.post(url, body);
    alert(JSON.stringify(response.data));
  } catch (error) {
    alert("somthing went wrong");
  }
};

export const getContainers = async () => {
  try {
    const url = `${process.env.REACT_APP_API}/container`;
    const response = await axios.get(url);
    const containers = response.data.data
    return { data: containers, error: false, message: "" };
  } catch (error) {
    alert("somthing went wrong");
  }
};
