import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import CheckoutSteps from './CheckoutSteps'

import MetaData from '../layouts/MetaData'
import { createNewOrder, cleareError } from '../../store/actions/orderActions'
import { NEW_ORDER_CREATE_RESET } from '../../store/Types/orderTypes'
import { CLEARE_CART } from '../../store/Types/cartType'


const Payment = ({ history }) => {

    const [cardNum, setCardNum] = useState("")
    const [cardExpir, setCardExpir] = useState("")
    const [cardCvc, setCardCvc] = useState("")


    const { cartItems, shippingInfo } = useSelector((state) => state.cart)
    const { isCreated, loding, error } = useSelector(state => state.newOrder)

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }



    const alert = useAlert()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        order.paymentInfo = {
            id: 12435689,
            status: "success"
        }
        dispatch(createNewOrder(order))
    }

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(cleareError())
        }

        if (isCreated) {
            alert.success('Order Created Successfully')
            history.push("/profile/me/orders")
            dispatch({ type: NEW_ORDER_CREATE_RESET })
            dispatch({ type: CLEARE_CART })
            sessionStorage.removeItem('orderInfo')
        }

    }, [error, alert, dispatch, isCreated, history])



    return (
        <div>
            <MetaData title={'Payment'} />
            <CheckoutSteps step1 step2 step3 />
            <div className="row my-lg-5">
                <div className="col-10 col-lg-5 offset-md-3 mt-5 card card-body shadow-lg">
                    <form onSubmit={submitHandler}>
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <input
                                type="text"
                                onChange={(e) => setCardNum(e.target.value)}
                                id="card_num_field"
                                className="form-control"
                                value={cardNum}
                                placeholder="For Testing"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <input
                                type="text"
                                onChange={(e) => setCardExpir(e.target.value)}
                                id="card_exp_field"
                                className="form-control"
                                value={cardExpir}
                                placeholder="For Testing"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <input
                                type="text"
                                onChange={(e) => setCardCvc(e.target.value)}
                                value={cardCvc}
                                id="card_cvc_field"
                                className="form-control"
                                placeholder="For Testing"
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="my_btn btn-block py-3 "
                            disabled={loding ? loding : false}
                        >
                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
                            {/* Order */}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Payment