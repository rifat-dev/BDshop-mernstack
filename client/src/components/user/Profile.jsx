import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Loader from '../layouts/Loader/Loader'
import MetaData from '../layouts/MetaData'

const Profile = () => {
    const { user, loading } = useSelector(state => state.auth)
    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={'Your Profile - BDShop'} />
                    <h2 className="mt-4" >Your Profile</h2>
                    <div className="row" >
                        <div className="col-12 col-md-6 mb-4" >
                            <img style={{ width: '100%' }} className="img-thumbnail img-fluid" src={user.avatar.url} alt={user.name} />
                            <Link to="/profile/me/edit-profile" className="btn btn-block mt-4" >Edit Your Profile</Link>
                        </div>
                        <div className="col-12 col-md-6">
                            <h4>Full Name</h4>
                            <p>{user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user.email}</p>

                            <h4>Joined On</h4>
                            <p>{String(user.createdAt).substring(0, 10)}</p>

                            {user.roal !== 'admin' && (
                                <Link to="/profile/me/orders" className="btn btn-danger btn-block mt-5">
                                    My Orders
                                </Link>
                            )}

                            <Link to="/profile/me/update-password" className="btn btn-primary btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Profile;
