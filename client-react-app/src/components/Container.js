import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { createContainer } from "../services/containerService";

const Container = () => {
  const [open, setOpen] = useState(false);
  const [containerName, setContainerName] = useState("");

  const handleContainerCreateSubmit = (event) => {
    event.preventDefault();
    if (containerName.length > 2) {
      createContainer(containerName);
      setContainerName('')
    } else {
      alert("container name length must be 3 or more ");
    }
  };

  const handleContainerChange = (event) => {
    setContainerName(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        create container
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <form
            className="containerForm"
            onSubmit={handleContainerCreateSubmit}
          >
            <h2>Create Container</h2>
            <label style={{ paddingBottom: 10 }}>Type Container Name</label>
            <input
              type="text"
              value={containerName}
              onChange={handleContainerChange}
              style={{ marginBottom: 10 }}
            />
            <button className="formButton" type="submit">
              Create
            </button>
          </form>
        </div>
      </Collapse>
    </div>
  );
};

export default Container;
