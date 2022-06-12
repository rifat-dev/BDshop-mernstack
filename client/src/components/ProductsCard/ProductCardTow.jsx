import "./productcardtow.scss";
import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import ProductModal from "../products/ProductModal";
const ProductCardTow = ({ product }) => {
  return (
    <div className="product-wrap mb-25 ">
      <div className="product-img">
        <Link to={`/product/${product._id}`}>
          <img
            className="default-img"
            src={product.images ? product.images[0].url : ""}
            alt="Product Image"
          />
          <img
            className="hover-img"
            src={product.images.length > 1 ? product.images[1].url : ""}
            alt="Product Image"
          />
        </Link>
        <div className="product-img-badges">
          {product.discount.isActive && (
            <span className="pink">{product.discount.persent}</span>
          )}
          {product.filter && <span className="purple">{product.filter}</span>}
        </div>
        <div className="product-action">
          <div className="pro-same-action pro-wishlist">
            <button className="" title="Add to wishlist">
              <FavoriteBorderOutlinedIcon />
            </button>
          </div>
          <div className="pro-same-action pro-cart">
            <button className="" title="Add to cart">
              {" "}
              <i className="pe-7s-cart"></i> Buy Now
            </button>
          </div>
          <div className="pro-same-action pro-quickview">
            <button title="Quick View">
              <ProductModal id={product._id}>
                <VisibilityOutlinedIcon />
              </ProductModal>
            </button>
          </div>
        </div>
      </div>
      <div className="product-content text-center">
        <h3>
          <Link to={`/product/${product._id}`}>
            {product.name.substr(0, 20)}
          </Link>
        </h3>
        <div className="product-rating">
          <i className="bi bi-star yellow"></i>
          <i className="bi bi-star yellow"></i>
          <i className="bi bi-star yellow"></i>
          <i className="bi bi-star yellow"></i>
          <i className="bi bi-star"></i>
        </div>
        <div className="product-price">
          <span>৳ {product.price}</span>
          <span className="old">৳ {product.regularPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTow;
