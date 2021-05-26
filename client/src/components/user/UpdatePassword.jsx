import { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'
import { clearError, updateUserPassword } from '../../store/actions/authActions'
import { UPDATE_PASSWORD_RESET } from '../../store/Types/authType'

const UpdatePassword = ({ history }) => {
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const alert = useAlert()
    const { isUpdated, loading, error } = useSelector(state => state.user)

    const submitForm = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('oldPassword', oldPassword)
        formData.append('password', password)

        dispatch(updateUserPassword(formData))

    }

    useEffect(() => {
        if (isUpdated) {
            alert.success("Password Updated successfully")
            history.push('/profile/me')
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }

        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

    }, [isUpdated, error, dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Update Your Password On BDshop'} />
                    <div className="col-12 col-md-6 offset-md-3 my-5" >
                        <MDBCol className="z-depth-5 p-4">
                            <form onSubmit={submitForm} >
                                <h1 className="h1 mb-4">Update Your Password</h1>
                                <div className="grey-text">

                                    <MDBInput name="password" label="Type your old password" icon="lock" group type="password" validate
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)} />
                                    <MDBInput name="password" label="Type your new password" icon="lock" group type="password" validate
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <MDBBtn type="submit"  >Update Password</MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default UpdatePassword;
