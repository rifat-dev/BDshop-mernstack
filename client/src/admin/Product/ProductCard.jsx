import { Fragment } from "react";
import { useDispatch } from "react-redux";
import "./Product.css";

import { deleteAdminProduct } from "../../store/actions/adminActions";

const ProductCard = ({ product, index, setShow, setPid }) => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="flip-card my-4">
        <div className={"flip-card-inner"}>
          <div className="flip-card-front">
            <div className="dashbord_product_card">
              <div className="dashbord_product_card_top">
                <h4> Product No: {index + 1}</h4>
              </div>
              <div className="dashbord_product_card_hader">
                <img src={product.images[0].url} alt="product" />
              </div>
              <div className="dashbord_product_card_body">
                <p>
                  <strong>Name : {product.name} </strong>{" "}
                </p>
                <p>
                  <strong>Price : </strong> {`$${product.price}`}{" "}
                </p>
                <p>
                  <strong>Catagory : {product.category}</strong>{" "}
                </p>
                <p>
                  <strong>Stock : </strong>{" "}
                  {product.stock > 0 ? "In Stock" : "Out Of Stock"}{" "}
                </p>
                <div className="row">
                  <button
                    className="ml-auto d_btn d_btn_edit "
                    onClick={() => {
                      setShow(true);
                      setPid(product._id);
                    }}>
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="mr-3 d_btn d_btn_delete"
                    onClick={() => dispatch(deleteAdminProduct(product._id))}>
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
