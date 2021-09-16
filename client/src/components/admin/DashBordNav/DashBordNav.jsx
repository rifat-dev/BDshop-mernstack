
import { Container, Navbar } from 'react-bootstrap';
import '../dashbord.css'

const DashboardNavbar = ({ match }) => {

    const { id } = match.params

    return (
        <Navbar className="my-4 p-3 " id="dashboard_nav" expand="lg"  >
            <Container fluid>
                <button
                    type="button" id="sidebarCollapse"
                    className="navbar-btn"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <Navbar.Brand>
                    <h2
                        className="d-inline-block ml-md-3 mb-0"
                        style={{ fontSize: "1.4rem", fontWeight: "600" }}>
                        {
                            id === "dashboard" ? "Dashboard"
                                : id === "products" ? "Products"
                                    : id === "newproduct" ? "Create A New Product"
                                        : id === "orders" ? "Orders"
                                            : id === "users" ? "All Users"
                                                : id === "review" ? "Review"
                                                    : ""
                        }
                    </h2>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    {/* <div className="ml-auto" >
                        <h1>Admin</h1>
                    </div> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;