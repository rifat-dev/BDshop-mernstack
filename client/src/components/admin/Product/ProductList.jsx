import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import ProductEditModal from './ProductEditModal';
import Loader from '../../layouts/Loader/Loader';
import MetaData from '../../layouts/MetaData';

import { getAdminProducts } from '../../../store/actions/adminActions'
import ProductCard from './ProductCard'

import { clearError } from '../../../store/actions/adminActions'
import { CLEAR_UPDATE_STATE, CLEAR_DELETE_STATE } from '../../../store/Types/adminType'


const ProductList = () => {

    const [pId, setPid] = useState('')
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()
    const alert = useAlert()

    const { products } = useSelector(state => state.adminAllProducts)
    const { isUpdated, loading, error, isDeleted } = useSelector(state => state.dashboardTracker)




    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (isUpdated) {
            dispatch({ type: CLEAR_UPDATE_STATE })
            dispatch(getAdminProducts())
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
    }, [dispatch])


    const handleClose = () => setShow(false);

    return (
        <div>
            <MetaData title="Product List-BDShop" />
            {loading ? <Loader />
                :
                <>
                    <div className="row">
                        {products.map(((product, index) => (
                            <>
                                <div key={product._id} className="col-lg-4">
                                    <ProductCard
                                        product={product}
                                        index={index}
                                        setShow={setShow}
                                        setPid={setPid}
                                    />
                                </div>
                                {pId === product._id &&
                                    <ProductEditModal
                                        show={show}
                                        handleClose={handleClose}
                                        product={product}
                                    />
                                }
                            </>
                        )))}
                    </div></>
            }
        </div>
    );
}

export default ProductList;
