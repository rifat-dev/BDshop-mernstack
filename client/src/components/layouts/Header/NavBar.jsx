import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './nav.css'

import { userLogout } from '../../../store/actions/authActions'

const NavBar = () => {
    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const alert = useAlert()

    const logoutHandeler = () => {
        dispatch(userLogout())
        alert.success("User Logged Out Successfully")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light">

            <div className="container">
                <Link to='/' style={{ color: 'black' }} >
                    <a className="navbar-brand"  >BDShop</a>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">

                    <div className="navbar-nav ml-auto d-flex align-items-center" >
                        <Link to='/' >
                            <a className="nav_text">Home <span class="sr-only">(current)</span></a>
                        </Link>

                        <Link to="/cart" >
                            <a className="bi bi-cart-check-fill  nav_text">
                                <span style={{ fontSize: '18px' }} className={cartItems.length > 0 ? "cart-num" : "cart-num"}  >{cartItems.length > 0 ? cartItems.length : 0}</span>
                            </a>
                        </Link>

                        <ul className="navbar-nav">
                            {isAuthenticated && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img
                                            src={user.avatar.url && user.avatar.url}
                                            alt="profile"
                                            className="avatar  rounded-circle"
                                        />
                                        {user.name && user.name}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {user && user.roal === "admin" && (
                                            <Link to="/admin/dashboard" className="dropdown-item" >Dashbord</Link>
                                        )}
                                        <Link to="/profile/me" className="dropdown-item" >Profile</Link>
                                        <Link
                                            to="/"
                                            className="dropdown-item"
                                            onClick={e => logoutHandeler()}
                                        >Logout</Link>
                                    </div>
                                </li>
                            )}
                        </ul>

                        {!isAuthenticated && (
                            <ul className="navbar-nav">
                                <li className="nav-item" >
                                    <Link to="/login" >
                                        <a className="nav-link">
                                            <button className="signin_btn " >LogIn</button>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
