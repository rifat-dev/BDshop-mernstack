import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const SideNav = ({ sideNavRef }) => {
  useEffect(() => {
    // dropdown never
    const dropdownList = document.querySelectorAll(".nav__dropdown");

    function showDropdown() {
      if (this.classList.contains("show")) {
        this.classList.remove("show");
      } else {
        this.classList.toggle("show");
      }
    }
    dropdownList.forEach((div) => div.addEventListener("click", showDropdown));

    // /*==================== LINK ACTIVE ====================*/
    // const linkColor = document.querySelectorAll(".nav__link");

    // function colorLink() {
    //   linkColor.forEach((l) => l.classList.remove("active"));
    //   this.classList.add("active");
    // }

    // linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }, []);

  return (
    <div className="admin_nav" id="admin_navbar" ref={sideNavRef}>
      <nav className="nav__container">
        <div>
          <NavLink to="/" className="nav__link nav__logo">
            <i className="bx bxs-disc nav__icon"></i>
            <span className="nav__logo-name">BD Shop</span>
          </NavLink>

          <div className="nav__list">
            <div className="nav__items">
              <NavLink to="/admin/dashbord" className="nav__link active">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Dashboard</span>
              </NavLink>

              <div className="nav__dropdown">
                <NavLink to="#" className="nav__link">
                  <ViewListIcon className="nav__icon" />
                  <span className="nav__name">Catalog</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </NavLink>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <NavLink
                      to="/admin/products"
                      className="nav__dropdown-item">
                      Product List
                    </NavLink>
                    <NavLink
                      to="/admin/newproduct"
                      className="nav__dropdown-item">
                      Product
                    </NavLink>
                    <NavLink
                      to="/admin/category"
                      className="nav__dropdown-item">
                      Categorys
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="nav__dropdown">
                <NavLink to="#" className="nav__link">
                  <PeopleAltIcon className="nav__icon" />
                  <span className="nav__name">Customers</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </NavLink>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <NavLink to="/admin/users" className="nav__dropdown-item">
                      Customers List
                    </NavLink>
                    <NavLink to="#" className="nav__dropdown-item">
                      Customer
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="nav__dropdown">
                <NavLink to="#" className="nav__link">
                  <ShoppingCartOutlinedIcon className="nav__icon" />
                  <span className="nav__name">Orders</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </NavLink>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <NavLink to="/admin/orders" className="nav__dropdown-item">
                      Orders List
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="nav__dropdown">
                <NavLink to="#" className="nav__link">
                  <FavoriteBorderOutlinedIcon className="nav__icon" />
                  <span className="nav__name">Marketing</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </NavLink>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <NavLink to="/admin/orders" className="nav__dropdown-item">
                      Coupon List
                    </NavLink>
                  </div>
                </div>
                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <NavLink to="/admin/coupon" className="nav__dropdown-item">
                      Coupon
                    </NavLink>
                  </div>
                </div>
              </div>

              {/* <NavLink to="#" className="nav__link">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Explore</span>
              </NavLink>
              <NavLink to="#" className="nav__link">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Saved</span>
              </NavLink> */}
            </div>
          </div>
        </div>

        <NavLink to="#" className="nav__link nav__logout">
          <i className="bx bx-log-out nav__icon"></i>
          <span className="nav__name">Log Out</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SideNav;
