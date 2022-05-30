import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./mobilenav.scss";

function MobileNev({ navOpen, mobileNavToggle }) {
  const sidenavRef = useRef();

  useEffect(() => {
    if (navOpen) {
      sidenavRef.current.style.width = "300px";
    } else {
      sidenavRef.current.style.width = "0px";
    }
  }, [navOpen]);

  return (
    <div id="mySidenav" className="sidenav" ref={sidenavRef}>
      <span className="closebtn" onClick={() => mobileNavToggle()}>
        &times;
      </span>

      <ul className="sidenav-nav-menu">
        <li onClick={() => mobileNavToggle()}>
          <Link to="">Home</Link>
        </li>
        <li onClick={() => mobileNavToggle()}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className="mobile-nav-dropdown">
          <span>
            Pages
            <ArrowDropDownOutlinedIcon />
          </span>
          <ul className="navbar-nav">
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
              <Link to="">About Us</Link>
            </li>
          </ul>
        </li>
        <li onClick={() => mobileNavToggle()}>
          <Link to="">Contact Us</Link>
        </li>
        <li onClick={() => mobileNavToggle()}>
          <Link to="/login">Login</Link>
        </li>
        <li onClick={() => mobileNavToggle()}>
          <Link to="/register">Registation</Link>
        </li>
      </ul>
    </div>
  );
}

export default MobileNev;
