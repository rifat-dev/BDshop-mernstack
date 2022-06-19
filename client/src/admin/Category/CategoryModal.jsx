import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

import axios from "axios";

const CategoryModal = ({ children, setCreated }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const [showHome, setShowHome] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelSubmit = async (e) => {
    e.preventDefault();
    const category = {
      name,
      showHome,
    };

    const { data } = await axios.post("/api/category/create", category);
    if (data.success) {
      handleClose();
      setCreated(true);
    }
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
            <div className="form-check form-switch my-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="isActive"
                id="isActive"
                value={showHome}
                onChange={() => setShowHome(!showHome)}
              />
              <label className="form-check-label" htmlFor="isActive">
                Show in home page a category feature
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CategoryModal;
