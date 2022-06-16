import "./product.scss";
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Image, ListGroup, Card, Form } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { BsShuffle } from "react-icons/bs";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

import { addToCartItem } from "../../store/actions/cartActions";
import {
  getSingleProduct,
  createProductReview,
  clearError,
} from "../../store/actions/productActions";
import { PRODUCT_REVIEW_RESET } from "../../store/Types/productType";
import CartLoader from "../layouts/Loader/CartLoader";
import MetaData from "../layouts/MetaData";
import ProductRating from "./ProductRating";

const SingleProduct = ({ match }) => {
  const { id } = match.params;
  const [quantity, setQuantity] = useState(1);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { product, loading, error } = useSelector(
    (state) => state.singleProduct
  );
  const { isCreate } = useSelector((state) => state.productReview);

  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  const reviewSubmit = (e) => {
    e.preventDefault();

    dispatch(createProductReview(product._id, { ratings: rating, comment }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isCreate) {
      dispatch({ type: PRODUCT_REVIEW_RESET });
      alert.success("Review created");
      dispatch(getSingleProduct(id));
      setRating(1);
      setComment("");
    }
  }, [error, dispatch, isCreate]);

  const onChangeQnt = (type) => {
    if (type === "remove") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      } else {
        alert.info("Remove failed");
      }
    } else {
      if (product.stock > quantity) {
        setQuantity(quantity + 1);
      } else {
        alert.info("Remove failed");
      }
    }
  };

  const productAddIntoCart = () => {
    dispatch(addToCartItem(product._id, quantity));
    alert.success("Product add to cart successfully");
  };

  return (
    <Fragment>
      {loading ? (
        <CartLoader />
      ) : Object.keys(product).length !== 0 ? (
        <Fragment>
          <MetaData title={`Product - ${product.name}`} />
          <div className="container-fluid single-product">
            <div className="row">
              <div className="col-12 col-md-4 single-product-image">
                <Image src={product.images[0].url} alt={product.name} fluid />
              </div>
              <div className="col-12 col-md-8 single-product-info">
                <h3 className="single-product-name">{product.name}</h3>
                <div className="single-product-ratings">
                  <ProductRating
                    value={product.ratings}
                    text={`${product.numOfReviews} reviews`}
                  />
                </div>
                <div className="single-prduct-prices">
                  {" "}
                  <span className="price">৳ {product.price}</span>
                  <span className="old">৳ {product.regularPrice}</span>
                </div>

                <p className="single-product-summary">{product.summary}</p>

                {/* <div className="row">
                  <div>Status:</div>
                  <div
                    className={
                      product.stock > 0 ? "text-success" : "text-danger"
                    }>
                    {product.stock > 0 ? "In Stock" : "Out Of Stock"}
                  </div>
                </div> */}

                <div className="single-product-quantity-controller">
                  <RemoveCircleIcon onClick={() => onChangeQnt("remove")} />
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    disabled
                  />
                  <AddCircleIcon onClick={() => onChangeQnt("add")} />
                </div>

                <div className="single-product-buttons">
                  <button
                    className="addToCArt-btn "
                    onClick={() => productAddIntoCart()}>
                    Add To Cart
                  </button>
                  <BsShuffle />
                  <FavoriteBorderOutlinedIcon />
                </div>
              </div>
            </div>

            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true">
                  Description
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false">
                  Additional Information
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="contact-tab"
                  data-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false">
                  Review
                </a>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab">
                <div className="p-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab">
                <div className="p-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.additionalInformation,
                    }}
                  />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab">
                ...
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className=" text-center card card-body my-4">
            <h3>Product Not Found</h3>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SingleProduct;
