import { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Compress from "react-image-file-resizer";
import { MDBRow, MDBCol, MDBInput } from 'mdbreact';

import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import { getUser, clearError, updateProfile } from '../../store/actions/authActions'
import { UPDATE_PROFILE_RESET } from '../../store/Types/authType'

const UpdateProfile = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [imagePreview, setImagePreview] = useState('https://mdbootstrap.com/img/Photos/Avatars/avatar-1-mini.jpg')

    const dispatch = useDispatch()
    const alert = useAlert()
    const { user } = useSelector(state => state.auth)
    const { loading, isUpdated, error } = useSelector(state => state.user)


    const handelChange = (e) => {
        const file = e.target.files[0];
        Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri) => {
                console.log(uri);
                setImagePreview(uri)
                setAvatar(uri)

            },
            "base64" // blob or base64 default base64
        );
    }

    const submitForm = (e) => {
        e.preventDefault()

        const data = new FormData()

        data.append('name', name)
        data.append('email', email)
        avatar && data.append('avatar', avatar)

        dispatch(updateProfile(data))

    }

    useEffect(() => {
        if (isUpdated) {
            alert.success("Profile Update Successfully")
            dispatch(getUser())
            history.push('/profile/me')
            dispatch({ type: UPDATE_PROFILE_RESET })
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setImagePreview(user.avatar.url)
        }
    }, [user, isUpdated, dispatch, error])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Update Your Profile On BDshop'} />
                    <div className="col-12 col-md-6 offset-md-3 my-5" >
                        <MDBCol className=" p-4">
                            <form onSubmit={submitForm} >
                                <h1 className="h1 mb-4">Update Your Profile</h1>
                                <div className="grey-text">
                                    <MDBInput name="name" label="Type Your Name" icon="user" group type="text" validate error="wrong"
                                        value={name}
                                        success="right" onChange={(e) => setName(e.target.value)} />
                                    <MDBInput name="email" label="Type your email" icon="envelope" group type="email" validate error="wrong"
                                        value={email}
                                        success="right" onChange={(e) => setEmail(e.target.value)} />
                                    <MDBRow className="ml-2 align-items-center" >
                                        <img
                                            src={imagePreview}
                                            alt="profile"
                                            className="avatar  rounded-circle z-depth-1-half mb-2"
                                        />
                                        <h5 className="ml-2" >Choose your profile picture</h5>
                                    </MDBRow>
                                    <MDBInput type="file" onChange={handelChange} />
                                </div>
                                <div className="text-center">
                                    <button className="my_btn btn-block" type="submit"  >Update Profile</button>
                                </div>
                            </form>
                        </MDBCol>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default UpdateProfile;
