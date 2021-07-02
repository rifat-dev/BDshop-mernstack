import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Card.css'
import ProductRating from './ProductRating'


import { addToCartItem } from '../../store/actions/cartActions'


const ProductCard = ({ product }) => {

    const [addProduct, setAddProduct] = useState(false)


    const dispatch = useDispatch()

    return (
        <Fragment>
            <div className="product_card">
                <div className="product_card_hader">
                    <img src={product.images[0].url} alt="product" />
                </div>
                <div className="product_card_body">
                    <Link to={`/product/${product._id}`} >
                        <h5>
                            {product.name}
                        </h5>
                    </Link>
                    <h5>
                        {`price $${product.price}`}
                    </h5>
                    <ProductRating value={product.ratings} text={` (${product.numOfReviews})`} />
                    <p>
                        Catagory:
                        <span>{` ${product.category}`}</span>
                    </p>

                    {addProduct ?
                        <Link to="/cart" >
                            <button className="card_btn card_btn_view" >
                                <i class="bi bi-cart-check-fill "></i>
                                View Cart
                            </button>
                        </Link> :
                        <Fragment>
                            <button
                                className=" card_btn card_btn_add"
                                onClick={() => {
                                    setAddProduct(true)
                                    dispatch(addToCartItem(product._id, 1))
                                }}
                                disabled={product.stock === 0}
                            >
                                <i class="bi bi-cart-plus-fill"></i>
                                Add
                            </button>
                            <Link to={`/product/${product._id}`}  >
                                <button className="btn-sm card_btn card_btn_detail" >
                                    {/* <i class="bi bi-cart-check-fill "></i> */}
                                    View Details
                                </button>
                            </Link>
                        </Fragment>

                    }


                </div>
            </div>
        </Fragment>
    )
}

export default ProductCard