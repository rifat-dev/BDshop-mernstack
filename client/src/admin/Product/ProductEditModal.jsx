import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import "./Product.css";

import { updateAdminProduct } from "../../store/actions/adminActions";

const ProductEditModal = ({ product, show, handleClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(product.name);
    setPrice(product.price);
  }, [product.name, product.price]);

  const updateProduct = (e) => {
    e.preventDefault();
    const data = {
      price,
      stock: qty ? Number.parseInt(qty) : 0,
    };
    dispatch(updateAdminProduct(product._id, data));
    handleClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="flip-card-back">
            <div className="flip-card-back_hader">
              <img src={product.images[0].url} alt="product" />
            </div>
            <div className="flip-card-back_card">
              <div className="flip-card-back_body">
                <form onSubmit={updateProduct}>
                  <div class="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={name}
                      disabled
                      id="name"
                    />
                  </div>
                  <div class="form-group">
                    <label htmlFor="price">Change Price</label>
                    <input
                      className="form-control"
                      type="text"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={`Old price is ${price}`}
                      id="price"
                    />
                  </div>
                  <div class="form-group">
                    <label htmlFor="number">Add Quantity</label>
                    <input
                      className="form-control"
                      type="number"
                      onChange={(e) => setQty(e.target.value)}
                      placeholder={`Available now ${product.stock} pices`}
                      name="qty"
                      id="number"
                    />
                  </div>
                  <button
                    type="submit"
                    class="my_btn flip-card-back_submit_btn ">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="my_btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductEditModal;
