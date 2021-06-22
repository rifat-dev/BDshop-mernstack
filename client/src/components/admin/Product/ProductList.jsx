import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../../layouts/Loader/Loader';
import MetaData from '../../layouts/MetaData';

import { getAdminProducts } from '../../../store/actions/adminActions'
import ProductCard from './ProductCard'

const ProductList = () => {

    const { products } = useSelector(state => state.adminAllProducts)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAdminProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Product List</h1>
            <div className="row">
                {products.map(((product, index) => (
                    <div className="col-lg-4">
                        <ProductCard product={product} index={index} />
                    </div>
                )))}
            </div>
        </div>
    );
}

export default ProductList;
