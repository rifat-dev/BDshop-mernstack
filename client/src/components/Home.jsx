import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'


import Hader from './Home/Hader/Hader'

import ProductCard from './products/ProductCard'

import Loader from '../components/layouts/Loader/Loader'
import MetaData from '../components/layouts/MetaData'
import { getAllProducts, clearError } from '../store/actions/productActions'


const Home = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { products, loading, error } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(getAllProducts())
    }, [error, dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Home-BDShop"} />
                    <Hader />
                    <h2 className="my-2" >Latest Product</h2>
                    <div className="row product-section my-4">
                        {products.map((product => (
                            <div className="col-12 col-sm-6 col-md-4" key={product._id} >
                                <ProductCard product={product} />
                            </div>
                        )))}
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
