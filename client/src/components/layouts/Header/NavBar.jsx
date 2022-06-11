import { useState, useEffect } from "react";

import "./header.scss";

import NavLogo from "./sub-components/NavLogo";
import NavMenu from "./sub-components/NavMenu";
import NavIcons from "./sub-components/NavIcons";
import MobileNev from "./MobileNev";
import CartNav from "./cartnav/CartNav";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  const mobileNavToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <>
      <nav
        className={
          sticky
            ? "navbar navbar-expand-lg navbar-light sticky_nav animate__animated animate__fadeInDownBig"
            : "navbar navbar-expand-lg navbar-light "
        }>
        <div className="container">
          <NavLogo />
          <NavMenu />
          <NavIcons
            mobileNavToggle={mobileNavToggle}
            setCartOpen={setCartOpen}
            cartOpen={cartOpen}
          />
        </div>
      </nav>
      <MobileNev navOpen={navOpen} mobileNavToggle={mobileNavToggle} />
      <CartNav setCartOpen={setCartOpen} cartOpen={cartOpen} />
    </>
  );
};

export default NavBar;
