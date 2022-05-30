import { Link } from "react-router-dom";

function NavLogo() {
  return (
    <div className="nav-logo">
      <Link to="/" style={{ color: "black" }}>
        <span>BDShop</span>
      </Link>
    </div>
  );
}

export default NavLogo;
