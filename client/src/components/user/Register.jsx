import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import { userRegister, clearError } from '../../store/actions/authActions'

const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name, email, password } = user
    const [avatar, setAvater] = useState('')
    const [imagePreview, setImagePreview] = useState('https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg')


    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const handelChange = (e) => {
        if (e.target.type === 'file') {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result)
                setAvater(e.target.result)
            }
            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const submitForm = (e) => {
        e.preventDefault()

        let formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('avatar', avatar)

        dispatch(userRegister(formData))
    }

    useEffect(() => {
        if (isAuthenticated) {
            alert.success('User Registation Successfully')
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
                    <MetaData title="Registation New Account" />
                    <div className=" div-center ">
                        <MDBCol className="z-depth-5 p-4" md="6">
                            <form onSubmit={submitForm} >
                                <h1 className="h1 text-center mb-4">Register User</h1>
                                <div className="grey-text">
                                    <MDBInput name="name" label="Type Your Name" icon="user" group type="text" validate error="wrong"
                                        value={name}
                                        success="right" onChange={handelChange} />
                                    <MDBInput name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                        value={email}
                                        success="right" onChange={handelChange} />
                                    <MDBInput name="password" label="Type your password" icon="lock" group type="password" validate
                                        value={password}
                                        onChange={handelChange} />
                                    <MDBRow className="ml-2 align-items-center" >
                                        <img
                                            src={imagePreview}
                                            alt="profile"
                                            className="avatar  rounded-circle z-depth-1-half"
                                        />
                                        <h5 className="ml-2" >Choose your profile picture</h5>
                                    </MDBRow>
                                    <MDBInput type="file" onChange={handelChange} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit"  >Register</MDBBtn>
                                </div>
                                <p>
                                    <Link to='/login' >
                                        Already have an account ?
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

export default Register;
