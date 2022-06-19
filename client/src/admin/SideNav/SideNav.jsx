import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ViewListIcon from "@mui/icons-material/ViewList";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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

    /*==================== LINK ACTIVE ====================*/
    const linkColor = document.querySelectorAll(".nav__link");

    function colorLink() {
      linkColor.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    }

    linkColor.forEach((l) => l.addEventListener("click", colorLink));
  }, []);

  return (
    <div className="admin_nav" id="admin_navbar" ref={sideNavRef}>
      <nav className="nav__container">
        <div>
          <Link to="/" className="nav__link nav__logo">
            <i className="bx bxs-disc nav__icon"></i>
            <span className="nav__logo-name">BD Shop</span>
          </Link>

          <div className="nav__list">
            <div className="nav__items">
              <Link to="/admin/dashbord" className="nav__link active">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Dashboard</span>
              </Link>

              <div className="nav__dropdown">
                <Link to="#" className="nav__link">
                  <ViewListIcon className="nav__icon" />
                  <span className="nav__name">Catalog</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </Link>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <Link to="/admin/products" className="nav__dropdown-item">
                      Product List
                    </Link>
                    <Link to="/admin/newproduct" className="nav__dropdown-item">
                      Product
                    </Link>
                    <Link to="/admin/category" className="nav__dropdown-item">
                      Categorys
                    </Link>
                  </div>
                </div>
              </div>

              <div className="nav__dropdown">
                <Link to="#" className="nav__link">
                  <PeopleAltIcon className="nav__icon" />
                  <span className="nav__name">Customers</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </Link>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <Link to="/admin/users" className="nav__dropdown-item">
                      Customers List
                    </Link>
                    <Link to="#" className="nav__dropdown-item">
                      Customer
                    </Link>
                  </div>
                </div>
              </div>

              <div className="nav__dropdown">
                <Link to="#" className="nav__link">
                  <ShoppingCartOutlinedIcon className="nav__icon" />
                  <span className="nav__name">Orders</span>
                  <ArrowDropDownOutlinedIcon className="nav__dropdown-icon" />
                </Link>

                <div className="nav__dropdown-collapse">
                  <div className="nav__dropdown-content">
                    <Link to="/admin/orders" className="nav__dropdown-item">
                      Orders List
                    </Link>
                  </div>
                </div>
              </div>

              {/* <Link to="#" className="nav__link">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Explore</span>
              </Link>
              <Link to="#" className="nav__link">
                <DashboardIcon className="nav__icon" />
                <span className="nav__name">Saved</span>
              </Link> */}
            </div>
          </div>
        </div>

        <Link to="#" className="nav__link nav__logout">
          <i className="bx bx-log-out nav__icon"></i>
          <span className="nav__name">Log Out</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
