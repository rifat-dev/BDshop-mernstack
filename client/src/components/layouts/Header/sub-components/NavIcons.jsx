import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { BsShuffle } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

import { userLogout } from "../../../../store/actions/authActions";

function NavIcons({ mobileNavToggle, cartOpen, setCartOpen }) {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const alert = useAlert();

  const logoutHandeler = () => {
    dispatch(userLogout());
    alert.success("User Logged Out Successfully");
  };

  return (
    <ul class="nav navbar-nav nav-icons ">
      <li className="nav-item nav-item-dropdown icons-dropdown">
        {user ? (
          <>
            <Avatar alt="Remy Sharp" src={user ? user.avatar.url : ""} />
          </>
        ) : (
          <Avatar alt="Remy Sharp" src="" />
        )}
        <div className="nav-item-dropdown-menu">
          <ul className="nav navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link to="/admin">Admin</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile/dashbord">Profile</Link>
                </li>
                <li className="nav-item" onClick={() => logoutHandeler()}>
                  <Link to="">Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </li>
      <li className="nav-item">
        <Badge badgeContent={0} color="secondary">
          <BsShuffle />
        </Badge>
      </li>
      <li className="nav-item">
        <Badge badgeContent={0} color="secondary">
          <FavoriteBorderOutlinedIcon />
        </Badge>
      </li>
      <li className="nav-item" onClick={() => setCartOpen(!cartOpen)}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <LocalMallOutlinedIcon />
        </Badge>
      </li>
      <li className="nav-item hamburger-menu" onClick={() => mobileNavToggle()}>
        <GiHamburgerMenu />
      </li>
    </ul>
  );
}

export default NavIcons;
