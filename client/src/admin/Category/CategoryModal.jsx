import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import axios from "axios";

const CategoryModal = ({ children, history }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const category = {
      name,
      description,
    };

    const { data } = await axios.post("/api/category/create", category);
    if (data.success) {
      handleClose();
      history.push("/admin/category");
    }
    console.log(data);
  };

  return (
    <>
      <button onClick={handleShow}>{children}</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handelSubmit}>
            <div className="mb-3 form-group">
              <label htmlFor="name" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                placeholder="Enter a category name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="description" className="form-label">
                Short Description
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                placeholder="Short note about category"
                onChange={(e) => setDescription(e.target.value)}
                rows="3"></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryModal;
