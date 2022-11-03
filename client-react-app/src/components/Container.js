import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// a modal page for creating a new container 
const Container = ({
  show,
  handleClose,
  handleContainerChange,
  handleSubmit,
}) => {
  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a Container</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Container name</Form.Label>
              <Form.Control
                onChange={handleContainerChange}
                type="text"
                placeholder=".. type here"
                autoFocus
              />
              <Form.Text muted>
                The container name must be atleast 3 letter
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" size="lg" onClick={handleSubmit}>
            create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Container;
