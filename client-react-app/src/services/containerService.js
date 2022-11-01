import axios from "axios";

export const createContainer = async (containerName) => {
  try {
    const body = { containerName: containerName };
    const url = "http://localhost:3001/container";
    const response = await axios.post(url, body);
    alert(JSON.stringify(response.data));
  } catch (error) {
    alert(JSON.stringify("somthing went wrong"));
  }
};

export const getContainers = async () => {
  try {
    const url = "http://localhost:3001/container";
    const response = await axios.get(url);
    const containers = response.data.data
    return { data: containers, error: false, message: "" };
  } catch (error) {
    return { data: null, error: true, message: "unable to get containers" }
  }
};
