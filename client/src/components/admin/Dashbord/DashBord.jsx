import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import Loader from '../../layouts/Loader/Loader'
import MetaData from '../../layouts/MetaData'

import { getAdminUsers, getAdminProducts, getAdminOrders, clearError } from '../../../store/actions/adminActions'
const Dashbord = () => {


    const { users } = useSelector(state => state.adminAllUsers)
    const { products } = useSelector(state => state.adminAllProducts)
    const { orders, loading, totalAmount } = useSelector(state => state.adminAllOrders)

    const dispatch = useDispatch()

    let stock = 0;

    products.forEach(p => {
        if (p.stock === 0) {
            stock++;
        }
    });
    console.log(stock)
    useEffect(() => {
        dispatch(getAdminUsers())
        dispatch(getAdminOrders())
        dispatch(getAdminProducts())
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'Amin Dashbord'} />
            {loading ?
                <Loader /> :
                <div className="row" >
                    <div className="col-xl-12 col-sm-12 mb-3">
                        <div className="card text-white bg-primary o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-sm-6  mb-3">
                        <div className="card text-white bg-success o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-danger o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-info o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                            </div>
                            <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                <span className="float-left">View Details</span>
                                <span className="float-right">
                                    <i className="fa fa-angle-right"></i>
                                </span>
                            </Link>
                        </div>
                    </div>


                    <div className="col-xl-3 col-sm-6 mb-3">
                        <div className="card text-white bg-warning o-hidden h-100">
                            <div className="card-body">
                                <div className="text-center card-font-size">Out of Stock<br /> <b>{stock}</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    );
}

export default Dashbord;
