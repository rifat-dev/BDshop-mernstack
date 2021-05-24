import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { useAlert } from 'react-alert'
import { userLogin, clearError } from '../../store/actions/authActions'

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
                    <div className=" div-center ">
                        <MDBCol className="z-depth-5 p-4" md="6">
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
                                    <MDBBtn type="submit"  >LogIn</MDBBtn>
                                </div>
                                <p>
                                    <Link to="/register" >
                                        Don't have any account ?
                            </Link>
                                </p>
                            </form>
                        </MDBCol>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Login;
