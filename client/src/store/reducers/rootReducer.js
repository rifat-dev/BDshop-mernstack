import { combineReducers } from 'redux'

import {
    authReducer,
    userReducer
} from './authReducer'

// products reducers import
import {
    productsReducer,
    singleProduct
} from './productReducer'

// Cart reducers import
import { cartReducer } from './cartReducer'
const rootReducer = combineReducers({
    // user reducers
    auth: authReducer,
    user: userReducer,

    // products reducers
    products: productsReducer,
    singleProduct: singleProduct,

    // cart reducers
    cart: cartReducer

})

export default rootReducer