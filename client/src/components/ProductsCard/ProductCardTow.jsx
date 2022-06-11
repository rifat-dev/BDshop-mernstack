import "./productcardtow.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
const ProductCardTow = () => {
  return (
    <div class="product-wrap mb-25">
      <div class="product-img">
        <a href="/product/6215de5bbc6bdb82bdf95cc5">
          <img
            class="default-img"
            src="https://www.mobiledokan.com/wp-content/uploads/2019/10/oneplus-7t-pro-mclaren.jpg"
            alt=""
          />
          <img
            class="hover-img"
            src="https://www.mobiledokan.com/wp-content/uploads/2019/10/OnePlus-7T-Pro-blue.jpg"
            alt=""
          />
        </a>
        <div class="product-img-badges">
          <span class="pink">-5%</span>
          <span class="purple">New</span>
        </div>
        <div class="product-action">
          <div class="pro-same-action pro-wishlist">
            <button class="" title="Add to wishlist">
              <FavoriteBorderOutlinedIcon />
            </button>
          </div>
          <div class="pro-same-action pro-cart">
            <button class="" title="Add to cart">
              {" "}
              <i class="pe-7s-cart"></i> Buy Now
            </button>
          </div>
          <div class="pro-same-action pro-quickview">
            <button title="Quick View">
              <VisibilityOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      <div class="product-content text-center">
        <h3>
          <a href="/product/6215de5bbc6bdb82bdf95cc5">OnePlus 7T</a>
        </h3>
        <div class="product-rating">
          <i class="bi bi-star yellow"></i>
          <i class="bi bi-star yellow"></i>
          <i class="bi bi-star yellow"></i>
          <i class="bi bi-star yellow"></i>
          <i class="bi bi-star"></i>
        </div>
        <div class="product-price">
          <span>৳ 62700</span>
          <span class="old">৳ 66000</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTow;
