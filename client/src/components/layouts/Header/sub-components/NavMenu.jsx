import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
function NavMenu() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const alert = useAlert();
  return (
    <>
      <ul className="nav navbar-nav nav-menu">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="nav-item nav-item-dropdown">
          <span>
            Pages
            <ArrowDropDownOutlinedIcon />
          </span>
          <div className="nav-item-dropdown-menu">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="">Cart</Link>
              </li>
              <li className="nav-item">
                <Link to="">Wishlist</Link>
              </li>
              <li className="nav-item">
                <Link to="">Compare</Link>
              </li>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="">Countact Us</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <Link to="/shop">Contact Us</Link>
        </li>
      </ul>
    </>
  );
}

export default NavMenu;
