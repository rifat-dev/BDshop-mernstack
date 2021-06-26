import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import Loader from '../../layouts/Loader/Loader';
import MetaData from '../../layouts/MetaData';

import { getAdminProducts } from '../../../store/actions/adminActions'
import ProductCard from './ProductCard'

import { clearError } from '../../../store/actions/adminActions'
import { CLEAR_UPDATE_STATE, CLEAR_DELETE_STATE } from '../../../store/Types/adminType'


const ProductList = () => {
    const { products } = useSelector(state => state.adminAllProducts)
    const dispatch = useDispatch()
    const alert = useAlert()

    const { isUpdated, loading, error, isDeleted } = useSelector(state => state.dashboardTracker)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            dispatch({ type: CLEAR_UPDATE_STATE })
            alert.success(' Product Update Success')
        }
    }, [dispatch, isUpdated, alert, error])

    useEffect(() => {
        if (isDeleted) {
            dispatch({ type: CLEAR_DELETE_STATE })
            dispatch(getAdminProducts())
            alert.success(' Product Delete Success')
        }
    }, [dispatch, isDeleted, alert])

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [])

    return (
        <div>
            <MetaData title="Product List-BDShop" />
            {loading ? <Loader />
                :
                <>
                    <h1>Product List</h1>
                    <div className="row">
                        {products.map(((product, index) => (
                            <div className="col-lg-4">
                                <ProductCard product={product} index={index} />
                            </div>
                        )))}
                    </div></>
            }
        </div>
    );
}

export default ProductList;
