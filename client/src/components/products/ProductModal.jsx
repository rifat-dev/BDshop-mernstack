import "./product.scss";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { BsShuffle } from "react-icons/bs";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { getSingleProduct } from "../../store/actions/productActions";
import { addToCartItem } from "../../store/actions/cartActions";

const ProductModal = ({ show, setShow, id }) => {
  const [qnt, setQnt] = useState(1);
  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => state.singleProduct);

  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  return (
    <>
      {Object.keys(product).length !== 0 && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="row product-modal-row">
              <div className="col-md-4 product-img">
                <img src={product.images[0].url} alt="Product Image" />
              </div>
              <div className="col-md-8 product-info">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-price">
                  <span className="price">৳ {product.price}</span>
                  <span className="old">৳ {product.regularPrice}</span>
                </div>
                <p className="product-summary">{product.summary}</p>
                <div className="product-qnt-controller">
                  <RemoveCircleIcon onClick={() => setQnt(qnt - 1)} />
                  <input
                    type="number"
                    name="qnt"
                    id="qnt"
                    value={qnt}
                    disabled
                  />
                  <AddCircleIcon onClick={() => setQnt(qnt + 1)} />
                </div>
                <div className="buttons">
                  <button
                    className="addToCArt-btn"
                    onClick={() => dispatch(addToCartItem(product._id, qnt))}>
                    Add To Cart
                  </button>
                  <BsShuffle />
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ProductModal;
