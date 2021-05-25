import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './nav.css'

import { userLogout } from '../../../store/actions/authActions'

const NavBar = () => {
    const { isAuthenticated, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const alert = useAlert()

    const logoutHandeler = () => {
        dispatch(userLogout())
        alert.success("User Logged Out Successfully")
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container">
                <Link to='/' style={{ color: 'black' }} >
                    <a class="navbar-brand"  >BDShop</a>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link to='/' >
                                <a class="nav-link">Home <span class="sr-only">(current)</span></a>
                            </Link>
                        </li>
                    </ul>


                    <div className="my-lg-0" >
                        <ul class="navbar-nav">
                            {isAuthenticated && (
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img
                                            src={user.avatar.url && user.avatar.url}
                                            alt="profile"
                                            className="avatar  rounded-circle"
                                        />
                                        {user.name && user.name}
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {user && user.roal === "admin" && (
                                            <Link to="/dashbord" class="dropdown-item" >Dashbord</Link>
                                        )}
                                        <Link to="/profile/me" class="dropdown-item" >Profile</Link>
                                        <Link
                                            to="/"
                                            class="dropdown-item text-danger"
                                            onClick={e => logoutHandeler()}
                                        >Logout</Link>
                                    </div>
                                </li>
                            )}
                            <Link className="nav-item mt-3" to="/cart" >
                                <a className="nav-link">
                                    Cart
                                    <span className="cart-num"  >{0}</span>
                                </a>
                            </Link>
                        </ul>
                    </div>
                    {!isAuthenticated && (
                        <ul class="navbar-nav">
                            <li className="nav-item" >
                                <Link to="/login" >
                                    <a className="nav-link">
                                        <button className="btn " >LogIn</button>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

        </nav>
    );
}

export default NavBar;
