import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Product.css'

import { updateAdminProduct, deleteAdminProduct } from '../../../store/actions/adminActions'



const ProductCard = ({ product, index }) => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState(0)
    const [isEdit, setEdit] = useState(false)

    const dispatch = useDispatch()


    useEffect(() => {
        setName(product.name)
        setPrice(product.price)
    }, [])


    const updateProduct = (e) => {
        e.preventDefault()
        const data = {
            price,
            stock: qty ? Number.parseInt(qty) : 0
        }
        setPrice(price)
        dispatch(updateAdminProduct(product._id, data))

    }

    return (
        <Fragment>
            <div class="flip-card my-4">
                <div class={isEdit ? 'flip-card-inner  flip-card-inner_rotate' : 'flip-card-inner'}>

                    <div class="flip-card-front">
                        <div className="dashbord_product_card" >
                            <div className="dashbord_product_card_top" >
                                <h4> Product No: {index + 1}</h4>
                            </div>
                            <div className="dashbord_product_card_hader">
                                <img src={product.images[0].url} alt="product" />
                            </div>
                            <div className="dashbord_product_card_body">
                                <p><strong>Name : {product.name} </strong>  </p>
                                <p><strong>Price : </strong> {`$${product.price}`}  </p>
                                <p><strong>Catagory : {product.category}</strong>  </p>
                                <p><strong>Stock :  </strong> {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}  </p>
                                <div className="row">
                                    <button
                                        className="ml-auto d_btn d_btn_edit "
                                        onClick={() => setEdit(!isEdit)}
                                    >
                                        <i class="bi bi-pencil-square"></i>
                                    </button>
                                    <button
                                        className="mr-3 d_btn d_btn_delete"
                                        onClick={() => dispatch(deleteAdminProduct(product._id))}
                                    >
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flip-card-back">
                        <div className="flip-card-back_hader">
                            <img src={product.images[0].url} alt="product" />
                        </div>
                        <div className="flip-card-back_card" >
                            <div className="flip-card-back_body">
                                <form onSubmit={updateProduct} >
                                    <div class="form-group">
                                        <label htmlFor="name">Product Name</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={name}
                                            disabled
                                            id="name" />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="price">Change Price</label>
                                        <input className="form-control"
                                            type="text"
                                            name="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder={`Old price is ${price}`}
                                            id="price" />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="number">Add Quantity</label>
                                        <input className="form-control"
                                            type="number"
                                            onChange={(e) => setQty(e.target.value)}
                                            placeholder={`Available now ${product.stock} pices`}
                                            name="qty"
                                            id="number" />
                                    </div>
                                    <button type="submit" class="my_btn flip-card-back_submit_btn ">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="flip-card-back_footer" onClick={() => setEdit(!isEdit)}>
                            <h6>
                                <i class="bi bi-arrow-left-short"></i>
                                Go Back
                            </h6>
                        </div>
                    </div>


                </div>
            </div>
        </Fragment>
    );
}

export default ProductCard;
