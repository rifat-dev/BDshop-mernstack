import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import './Product.css'



import img from '../../../assets/img1.jpg'

const ProductCard = ({ product, index }) => {
    const [isEdit, setEdit] = useState(false)

    console.log(index)
    return (
        <Fragment>
            <div class="flip-card my-4">
                <div class={isEdit ? 'flip-card-inner  flip-card-inner_rotate' : 'flip-card-inner'}>

                    <div class="flip-card-front">
                        <div className="dashbord_product_card" >
                            <div className="dashbord_product_card_top" >
                                <h4> Serial No {index + 1}</h4>
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

                                    >
                                        <i class="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flip-card-back">
                        <div className="flip-card-back_hader">
                            <h6>Edit Product Card</h6>
                        </div>
                        <div className="flip-card-back_card" >
                            <div className="flip-card-back_body">
                                <form>
                                    <div class="form-group">
                                        <label htmlFor="name">Product Name</label>
                                        <input className="form-control" type="text" name="name" id="name" />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="price">Change Price</label>
                                        <input className="form-control" type="number" name="price" id="price" />
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="number">Add Quenty</label>
                                        <input className="form-control" type="number" name="qty" id="number" />
                                    </div>
                                    <button type="submit" class="my_btn">Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="flip-card-back_hader" onClick={() => setEdit(!isEdit)}>
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
