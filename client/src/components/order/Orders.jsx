import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader/Loader'

import { getMyOrders } from '../../store/actions/orderActions'

const Orders = () => {

    const dispatch = useDispatch()

    const { orders, loading, error } = useSelector(state => state.myOrders)

    useEffect(() => {
        dispatch(getMyOrders())
    }, [])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    {orders.length > 0 ? (
                        <Fragment>
                            <MetaData title={"My Orders List-BDShop"} />
                            <table className="table product-table my-4">
                                <thead>
                                    <tr>
                                        <th>Order Id</th>
                                        <th>NumOfItems</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr>
                                            <td>
                                                <h5><strong>{order._id}</strong></h5>
                                            </td>
                                            <td>{order.orderItems.length}</td>
                                            <td>{order.totalPrice}</td>
                                            <td>
                                                <p
                                                    className={`${order.orderStatus === 'Processing' ?
                                                        'text-danger' : order.orderStatus === 'Shipping' ?
                                                            'text-primary' : 'text-success'
                                                        }`}
                                                >
                                                    {order.orderStatus}
                                                </p>
                                            </td>
                                            <td>
                                                <Link to={`/profile/me/orders/${order._id}`} className="btn btn-primary">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Fragment>
                    ) : (
                        <h1> Your Order List Is Empty </h1>
                    )}
                </Fragment>
            )
            }
        </Fragment >
    );
}

export default Orders;
