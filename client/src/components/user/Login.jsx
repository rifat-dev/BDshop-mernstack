import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { useAlert } from 'react-alert'
import { userLogin, clearError } from '../../store/actions/authActions'
import shoppingSVG from '../../assets/shopping.svg'
import './User.css'

import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'

const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const submitHandelar = (e) => {
        e.preventDefault()
        dispatch(userLogin(email, password))
    }

    useEffect(() => {
        if (isAuthenticated) {
            alert.success('User Login Success')
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [error, dispatch, isAuthenticated, history, alert])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Login Your Account" />
                    <Link to="/" >
                        <button className="my_btn mt-5 ml-5" >
                            <i class="bi bi-house-door-fill"></i>
                            Go To Home
                        </button>
                    </Link>
                    <div className="login row">
                        <div className="col-md-6 login_form user_form">

                            <div className="alert alert-danger m-4" role="alert">
                                <h4 className="alert-heading">Hello !</h4>
                                <p><strong>Note That:</strong> If you want check Admin Panel?
                                    Then you must use.</p>
                                <p><strong>email:</strong>  admin@gmail.com</p>
                                <p><strong> Password: </strong> admin123</p>
                            </div>

                            <MDBCol className="" md="8">
                                <form onSubmit={submitHandelar}  >
                                    <h1 className="h1 text-center mb-4">LogIn User</h1>
                                    <div className="grey-text">
                                        <MDBInput
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            label="Type your email"
                                            icon="envelope"
                                            group type="email"
                                            validate error="wrong"
                                            success="right" />
                                        <MDBInput
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            label="Type your password"
                                            icon="lock"
                                            group type="password"
                                            validate
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button className="my_btn" type="submit"  >
                                            <i class="bi bi-unlock-fill"></i>
                                            LogIn
                                        </button>
                                    </div>
                                    <p>
                                        <Link to="/register" >
                                            Don't have any account ?
                                        </Link>
                                    </p>
                                </form>
                            </MDBCol>
                        </div>
                        <div className="col-md-6 login_img user_img">
                            <img src={shoppingSVG} alt="Shopping.svg" />
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Login;
