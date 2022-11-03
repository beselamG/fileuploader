import { useContext, useEffect, useState } from "react";
import { uploadBlob } from "../services/blobService";
import { createContainer, getContainers } from "../services/containerService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Container from "./Container";
import { BlobListUpdaterContext } from "../context/BlobListUpdater";

// upload a new file 
const FileUploader = () => {
  const [file, setFile] = useState();
  const [selectedContainer, setSelectedContainer] = useState("");
  const [containers, setContainers] = useState([]);
  const [containerName, setContainerName] = useState("");
  const [show, setShow] = useState(false);
  const [updateList, setUpdateList] = useContext(BlobListUpdaterContext);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const handleContainerCreateSubmit = async (event) => {
    event.preventDefault();
    if (containerName.length > 2) {
      await createContainer(containerName);
      setContainerName("");
      handleClose();
      getContainerList();
    } else {
      alert("container name length must be 3 or more ");
    }
  };
  const handleFileSubmit = async (event) => {
    event.preventDefault();
    if (selectedContainer?.length > 1 && file !== undefined) {
      console.log(selectedContainer);
      await uploadBlob(selectedContainer, file);
      const updateBlobList = updateList + 1;
      setUpdateList(updateBlobList);
    } else {
      alert("unable to upload, check the fields are correct");
    }
  };

  const handleContainerChange = (event) => {
    console.log(event.target.value);
    setContainerName(event.target.value);
  };

  const handleContainerSelect = (event) => {
    setSelectedContainer(event.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getContainerList = async () => {
    const response = await getContainers();
    if (response?.data != null) {
      setContainers(response.data);
      setSelectedContainer(response.data[0]);
    }
  };

  useEffect(() => {
    getContainerList();
  }, []);

  return (
    <div className="uploadWrapper">
      <Container
        show={show}
        handleClose={handleClose}
        handleContainerChange={handleContainerChange}
        handleSubmit={handleContainerCreateSubmit}
      />
      <Card className="uploaderCard">
        <div className="selectContainer">
          <Form.Label>Select a Container</Form.Label>

          <div className="createContainer">
            <Button variant="link" onClick={handleShow}>
              create a new container
            </Button>
          </div>
        </div>

        <Form.Select onChange={handleContainerSelect} value={selectedContainer}>
          {containers.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </Form.Select>
        <div className="fileUploadHolder">
          <Form.Group
            controlId="formFile"
            className="mb-3"
            onSubmit={handleFileSubmit}
          >
            <Form.Label>Select a file to upload</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              formEncType="multipart/form-data"
            />
          </Form.Group>
        </div>
        <div></div>
        <Button
          type="submit"
          variant="dark"
          size="lg"
          onClick={handleFileSubmit}
        >
          upload
        </Button>
      </Card>
    </div>
  );
};
export default FileUploader;
