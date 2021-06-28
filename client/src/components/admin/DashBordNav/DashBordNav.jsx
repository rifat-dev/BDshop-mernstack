
import { Container, Navbar } from 'react-bootstrap';
import '../dashbord.css'

const DashboardNavbar = ({ setShow, show, match }) => {

    const { id } = match.params

    return (
        <Navbar className="my-4 " id="dashboard_nav" expand="lg"  >
            <Container fluid>
                <button
                    onClick={() => setShow(!show)}
                    type="button" id="sidebarCollapse"
                    className={show ? "navbar-btn active" : "navbar-btn"}
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
                                            : id === "manageServices" ? "Manage Services"
                                                : id === "book" ? "Book"
                                                    : id === "bookingList" ? "Booking List"
                                                        : id === "review" ? "Review"
                                                            : ""
                        }
                    </h2>
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <div className="ml-auto" >
                        <h1>Admin Dashboard</h1>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default DashboardNavbar;