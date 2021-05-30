import axios from 'axios'
import { ADD_TO_CART, REMOVE_ITEM_TO_CART } from '../Types/cartType'

export const addToCartItem = (id, quantity) => async(dispatch) => {

    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: ADD_TO_CART,
        payload: {
            _id: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity: parseInt(quantity)
        }
    })
}

export const removeToCart = (id) => dispatch => {
    dispatch({
        type: REMOVE_ITEM_TO_CART,
        payload: id
    })
}