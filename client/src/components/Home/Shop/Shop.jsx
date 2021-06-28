import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../../layouts/Loader/Loader'
import MetaData from '../../layouts/MetaData'

import ProductCard from '../../products/ProductCard'
import ShopHader from './ShopHader';
import Category from '../../../utils/ProductCategory'

import { getAllProducts, clearError } from '../../../store/actions/productActions'

import './Shop.css'
const Shop = () => {
    const [shopProducts, setShopProducts] = useState([])
    const [category, setCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    useEffect(() => {
        let result = products.filter(product => (
            product.category.toLowerCase().includes(category === 'All' ? '' : category.toLowerCase())
        ))
        // console.log(result)
        setShopProducts(result)
    }, [category, products])

    return (
        <div className="shop" >
            {loading ? <Loader /> :
                <>
                    <ShopHader setCategory={setCategory} />

                    <div className="search_filter container mt-5">
                        <div className="col-md-3">
                            <select className="select_shop"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="All">All</option>
                                {Category.map(c => (
                                    <option className={c} value={c} >{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input type="text" />
                        </div>
                    </div>

                    <div className="shop_body container mb-5">
                        <div className="row">
                            {shopProducts.map(product => (
                                <div key={product._id} className="col-md-6">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default Shop;
