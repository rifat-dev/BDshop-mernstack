import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import './Order.css'


import Loading from '../../layouts/Loader/Loader'
import MetaData from '../../layouts/MetaData'

import SortBy from '../../common/SortBy';
import OrderListCard from './OrderListCard'

import { getAdminOrders, clearError } from '../../../store/actions/adminActions'


const OrderList = () => {
    const [sortBy, setSortBy] = useState('All')
    const [adminOrders, setAdminOrders] = useState([])

    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, orders, error } = useSelector(state => state.adminAllOrders)

    useEffect(() => {
        dispatch(getAdminOrders())
    }, [dispatch])


    useEffect(() => {
        let result = orders.filter(order => (
            order.orderStatus.toLowerCase().includes(sortBy === 'All' ? '' : sortBy.toLowerCase())
        ))
        // console.log(result)
        setAdminOrders(result)
    }, [sortBy, orders])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
    }, [error, alert, dispatch])


    return (
        <>
            <MetaData title={'Order List - BDShop'} />
            <div className="order_list_container" >
                <div className="order_list_container_hader row">
                    <SortBy setSortBy={setSortBy} />
                </div>
                {loading ? <Loading /> :
                    <div className="order_list_container_body row">
                        {adminOrders.map((order_list, index) => (
                            <OrderListCard
                                key={order_list._id}
                                index={index}
                                order_list={order_list}
                            />
                        ))}
                    </div>
                }
            </div>
        </>
    );
}

export default OrderList;
