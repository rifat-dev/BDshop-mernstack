import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './Cart.css'
import { useAlert } from 'react-alert'
import MetaData from '../layouts/MetaData'
import { addToCartItem, removeToCart } from '../../store/actions/cartActions'

import emptyCartSvg from '../../assets/emptyCart.svg'

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0)

    const alert = useAlert()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth)

    const increment = (id, qty) => {
        dispatch(addToCartItem(id, qty + 1))
    }
    const decrement = (id, qty) => {
        dispatch(addToCartItem(id, qty - 1))
    }

    useEffect(() => {
        let price = 0;
        cartItems.map(product => price = price + product.price * product.quantity)
        setTotalPrice(price)
    }, [cartItems, dispatch])

    return (
        <div className="table-responsive">
            <MetaData title={'Chart Items'} />
            {cartItems.length === 0 ?
                <div className="empty_cart"  >
                    <div className="empty_cart_body">
                        <img src={emptyCartSvg} alt="Empty Cart" />
                    </div>
                    <Link to='/shop' >
                        <button className="my_btn">
                            <i class="bi bi-arrow-left-short"></i>
                            Go To Shop
                        </button>
                    </Link>
                </div> : (
                    <Fragment>
                        <div className="container mt-4">
                            <table className="table product-table my-5">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>QTY</th>
                                        <th></th>
                                        <th>Amount</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {cartItems.map(product => (
                                        <tr>
                                            <th scope="row">
                                                <img
                                                    src={product.image}
                                                    style={{ width: '200px' }}
                                                    alt="Product"
                                                    className="img-fluid"
                                                />
                                            </th>
                                            <td>
                                                <h5><strong>{product.name}</strong></h5>

                                            </td>
                                            <td>{product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td >
                                                <div className="row">
                                                    <div className="btn-group" data-toggle="buttons">
                                                        <label
                                                            class="my_btn"
                                                            onClick={() => product.quantity > 1 ? decrement(product._id, product.quantity) : alert.error("you can not remove more product")}
                                                            style={{ fontSize: '15px' }}>
                                                            &mdash;
                                                        </label>
                                                        <label
                                                            className="my_btn btn-rounded"
                                                            onClick={() => product.stock > product.quantity ? increment(product._id, product.quantity) : alert.error('Product Stock Is Finished')}
                                                            style={{ fontSize: '15px' }}>
                                                            +
                                                        </label>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{product.price * product.quantity}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(removeToCart(product._id))}
                                                    className="my_btn"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Remove item">X
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                    {/* bottom section */}
                                    <tr>
                                        <td>
                                            <h4><strong>Total</strong></h4></td>
                                        <td colSpan="2" >
                                            <h4><strong>{totalPrice} $</strong></h4></td>
                                        <td colSpan="4">
                                            {isAuthenticated ?
                                                <Link to='/shipping' >
                                                    <button type="button" className="my_btn">Complete purchase  <i className="fa fa-angle-right right"></i></button>
                                                </Link>
                                                : <Link to='/login' >
                                                    <button type="button" className="my_btn"> LogIn to purchase  <i className="fa fa-angle-right right"></i></button>
                                                </Link>
                                            }
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </Fragment>
                )}
        </div>
    );
}

export default Cart;
