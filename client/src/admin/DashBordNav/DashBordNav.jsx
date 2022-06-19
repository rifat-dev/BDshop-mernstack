import { Container, Navbar } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import "./dashbordnav.scss";

const DashboardNavbar = ({ setShow, show }) => {
  return (
    <Navbar className="mb-4" id="dashboard_nav" expand="lg">
      <Container fluid>
        <button
          type="button"
          id="sidebarCollapse"
          className="navbar-btn"
          onClick={() => setShow(!show)}>
          {show ? (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          ) : (
            <MenuIcon />
          )}
        </button>

        <Navbar.Brand></Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
