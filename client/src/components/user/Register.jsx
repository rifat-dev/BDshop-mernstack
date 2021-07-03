import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';
import Compress from "react-image-file-resizer";
import './User.css'


import logoutSvg from '../../assets/login.svg'
import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import { registationValidator } from '../../utils/validator'
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
    const [errors, setErrors] = useState({})


    const alert = useAlert()
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const handelChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            Compress.imageFileResizer(
                file, // the file from input
                480, // width
                480, // height
                "JPEG", // compress format WEBP, JPEG, PNG
                70, // quality
                0, // rotation
                (uri) => {
                    setImagePreview(uri)
                    setAvater(uri)
                },
                "base64" // blob or base64 default base64
            );
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const submitForm = (e) => {
        e.preventDefault()

        const { error, isValidate } = registationValidator(name, password, name)

        if (!isValidate) {
            return setErrors(error)
        }

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
                    <Link to="/" >
                        <button className="my_btn  mt-5 ml-5" >
                            <i class="bi bi-house-door-fill"></i>
                            Go To Home
                        </button>
                    </Link>
                    <div className="register row">
                        <div className="col-md-6 register_img user_img">

                            <img src={logoutSvg} alt="" />
                        </div>
                        <div className="col-md-6 register_form user_form">
                            <MDBCol className="p-4" md="8">
                                <form onSubmit={submitForm} >
                                    <h1 className="h1 text-center mb-4">Register User</h1>
                                    <div className="grey-text">
                                        <MDBInput
                                            name="name"
                                            label={errors.name ? errors.name : "Type Your Name"}
                                            icon="user" group type="text"
                                            validate error="wrong"
                                            value={name}
                                            className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                            success="right" onChange={handelChange} />
                                        <MDBInput name="email"
                                            label={errors.email ? errors.email : "Type your email"}
                                            icon="envelope"
                                            group type="email"
                                            validate error="wrong"
                                            value={email}
                                            className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                            success="right" onChange={handelChange} />
                                        <MDBInput
                                            name="password"
                                            label={errors.password ? errors.password : "Type your password"}
                                            icon="lock"
                                            group type="password" validate
                                            value={password}
                                            className={errors.password ? 'form-control is-invalid' : 'form-control'}
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
                                        <button className="my_btn" type="submit"  >
                                            <i class="bi bi-person-fill"></i>
                                            Register
                                        </button>
                                    </div>
                                    <p>
                                        <Link to='/login' >
                                            Already have an account ?
                                        </Link>
                                    </p>
                                </form>
                            </MDBCol>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Register;
