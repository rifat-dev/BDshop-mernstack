import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../layouts/MetaData'

import { getAdminUsers, getAdminProducts, getAdminOrders, clearError } from '../../../store/actions/adminActions'
const Dashbord = () => {


    const { users } = useSelector(state => state.adminAllUsers)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdminUsers())
        dispatch(getAdminOrders())
        dispatch(getAdminProducts())
    }, [dispatch])

    return (
        <div>
            <h1>I am Dashboard</h1>
        </div>
    );
}

export default Dashbord;
