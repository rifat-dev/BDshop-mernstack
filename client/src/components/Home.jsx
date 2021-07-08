import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'


import Hader from './Home/Hader/Hader'
import Products from './products/Products'
import Blog from './Home/Blog/Blog'
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
    }, [error, dispatch, alert])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={"Home-BDShop"} />
                    <Hader />
                    <Products products={products} />
                    <Blog />
                </Fragment>
            )}
        </Fragment>
    );
}

export default Home;
