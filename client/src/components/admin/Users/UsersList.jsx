import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import "./User.css"

import UsersListCard from './UsersListCard';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader/Loader';

import { getAdminUsers, clearError } from '../../../store/actions/adminActions'

const UsersList = () => {

    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.adminAllUsers)

    useEffect(() => {
        dispatch(getAdminUsers())
    }, [])

    return (
        <div className="row">
            {users.map(user => (
                <div key={user._id} className="col-md-4">
                    <UsersListCard user={user} />
                </div>
            ))}
        </div>
    );
}

export default UsersList;
