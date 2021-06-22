import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader/Loader'
import { getMySingleOrder, cleareError } from '../../store/actions/orderActions'

const OrderDetails = ({ match, history }) => {
    const { id } = match.params

    const { user } = useSelector(state => state.auth)
    const { singleOrder, loading, error } = useSelector(state => state.singleOrderDetails)
    const { shippingInfo, orderItems, paymentInfo, totalPrice, orderStatus } = singleOrder
    const dispatch = useDispatch()
    const alert = useAlert()

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'success' ? true : false


    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(cleareError())
            history.push("/profile/me/orders")
        }

        dispatch(getMySingleOrder(id))

    }, [error, dispatch])


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={`Order No - ${id}`} />
                    <div className="container">
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8 mt-5 order-details">

                                <h1 className="my-5">Order # {singleOrder._id}</h1>

                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>

                                <hr />

                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>


                                <h4 className="my-4">Order Status:</h4>
                                <p className={singleOrder.orderStatus && String(singleOrder.orderStatus).includes('Delivered') ? "text-success" : "text-danger"} ><b>{orderStatus}</b></p>


                                <h4 className="my-4">Order Items:</h4>

                                <hr />
                                <div className="cart-item my-1">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="row my-5">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height="45" width="65" />
                                            </div>

                                            <div className="col-5 col-lg-5">
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </div>


                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>

                                            <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    );
}

export default OrderDetails;
