import { useEffect, useState } from "react";
import { uploadBlob } from "../services/blobService";
import { getContainers } from "../services/containerService";

const FileUploader = () => {
  const [file, setFile] = useState();
  const [selectedContainer, setSelectedContainer] = useState("");
  const [containers, setContainers] = useState([]);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (selectedContainer?.length > 1 && file !== undefined) {
        console.log(selectedContainer);
      uploadBlob(selectedContainer, file);
    } else {
      alert("unable to upload, check the fields are correct");
    }
  };

  const handleContainerSelect = (event) => {
    setSelectedContainer(event.target.value);
  };

  const getContainerList = async () => {
    const response = await getContainers();
    if (response?.data != null) {
      setContainers(response.data);
      setSelectedContainer(response.data[0])
    }
  };

  useEffect(() => {
    getContainerList();
  }, []);

  return (
    <div>
      <form className="uploadForm" onSubmit={handleFileSubmit}>
        <h2>File Upload</h2>
        <label style={{ paddingBottom: 10 }}>Choose a Conainer</label>
        <select onChange={handleContainerSelect} value={selectedContainer}>
          {containers.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        <input
          encType="multipart/form-data"
          name="file"
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: 10 }}
        />
        <button className="formButton" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};
export default FileUploader;
