import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./cartnav.scss";
import { AiFillDelete } from "react-icons/ai";

import { removeToCart } from "../../../../store/actions/cartActions";

function CartNav({ cartOpen, setCartOpen }) {
  const [subtotal, setSubtotal] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);

  const navCartRef = useRef();

  useEffect(() => {
    if (cartOpen) {
      navCartRef.current.style.marginRight = "0px";
    } else {
      navCartRef.current.style.marginRight = "-500px";
    }
  }, [cartOpen]);

  useEffect(() => {
    let price = 0;
    cartItems.map((product) => (price += product.price * product.quantity));
    setSubtotal(price);
  }, [cartItems]);
  return (
    <div className="cart-nav" ref={navCartRef}>
      <span className="closebtn" onClick={() => setCartOpen(!cartOpen)}>
        &times;
      </span>
      <div className="cart-warpper">
        <h3>Shopping Cart</h3>
        {cartItems &&
          cartItems.map((product, index) => <CartProduct product={product} />)}
        <div className="sub-total">
          <h4>Subtotal : </h4>
          <span>{`$${subtotal}`}</span>
        </div>
        <div className="cart-buttons">
          <Link to="/cart" onClick={() => setCartOpen(!cartOpen)}>
            <button className="cart-btn">View Cart</button>
          </Link>
          <button className="cart-btn">Checkout</button>
        </div>
      </div>
    </div>
  );
}

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="cart-product-warpper" key={product._id}>
        <div className="cart-product-left">
          <img src={product.image} alt="Product_img" className="product-img" />
          <div className="product-info">
            <h4 className="product-title">
              {product.name.substring(0, 15) + ".."}
            </h4>
            <span>{`${product.quantity} x $${product.price}`}</span>
          </div>
        </div>
        <div className="cart-product-right">
          <AiFillDelete onClick={() => dispatch(removeToCart(product._id))} />
        </div>
      </div>
    </>
  );
};

export default CartNav;
