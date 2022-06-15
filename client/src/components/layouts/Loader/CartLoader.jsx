import React from "react";
import "./loader.scss";
import cartimage from "../../../assets/shopping-cart-loader.gif";

const CartLoader = () => {
  return (
    <div className="cart-loader">
      <div className="cart-image">
        <img src={cartimage} alt="" />
      </div>
    </div>
  );
};

export default CartLoader;
