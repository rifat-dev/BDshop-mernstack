import { Link } from 'react-router-dom'
import logo from '../../../assets/logo3.png'


const SideNav = ({ id, show }) => {

    return (
        <div id="sideBar" className={show ? 'active sidebar-wrapper' : 'sidebar-wrapper'}  >
            <nav id="sidebar"  >
                <div className="sidebar-header">
                    <Link to="/" >
                        <img src={logo} alt="logo" style={{ width: '90%', height: '70%', objectFit: 'contain' }} />
                    </Link>
                </div>
                <ul className="list-unstyled components">
                    <li >
                        <Link className={id === 'dashboard' ? 'sidebar-active' : ''} to="/admin/dashboard"><i class="bi bi-speedometer2"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i className="bi bi-bag-dash"></i> Products</a>
                        <ul className="collapse list-unstyled" id="productSubmenu">
                            <li>
                                <Link
                                    className={id === 'products' ? 'sidebar-active' : ''}
                                    to="/admin/products"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link
                                    className={id === 'newproduct' ? 'sidebar-active' : ''}
                                    to="/admin/newproduct"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link
                            className={id === 'orders' ? 'sidebar-active' : ''}
                            to="/admin/orders"><i className="fa fa-shopping-basket"></i> Orders</Link>
                    </li>

                    <li>
                        <Link
                            className={id === 'users' ? 'sidebar-active' : ''}
                            to="/admin/users"><i className="fa fa-users"></i> Users</Link>
                    </li>

                    <li>
                        <Link
                            className={id === 'reviews' ? 'sidebar-active' : ''}
                            to="/admin/reviews"><i className="fa fa-star"></i> Reviews</Link>
                    </li>

                    <li>
                        <Link
                            className={id === 'addAdmin' ? 'sidebar-active' : ''}
                            to="/admin/addAdnun"><i className="fa fa-users"></i> Add Admin</Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}

export default SideNav;
