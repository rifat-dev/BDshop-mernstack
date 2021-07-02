import { combineReducers } from 'redux'

import {
    authReducer,
    userReducer
} from './authReducer'

// products reducers import
import {
    productsReducer,
    singleProduct,
    productReview
} from './productReducer'

// Cart reducers import
import { cartReducer } from './cartReducer'

// Order Reducers
import { newOrder, myOrders, singleOrderDetails } from './orderReducer'

// admin Reducers
import {
    adminAllUsersReducer,
    adminAllProductsReducer,
    adminAllOrdersReducer,
    adminDashboardTracker
} from './adminReducer'
const rootReducer = combineReducers({
    // user reducers
    auth: authReducer,
    user: userReducer,

    // products reducers
    products: productsReducer,
    singleProduct: singleProduct,
    productReview: productReview,

    // cart reducers
    cart: cartReducer,
    // Order Reducers
    newOrder: newOrder,
    myOrders: myOrders,
    singleOrderDetails: singleOrderDetails,

    // admin reducers
    adminAllUsers: adminAllUsersReducer,
    adminAllProducts: adminAllProductsReducer,
    adminAllOrders: adminAllOrdersReducer,
    dashboardTracker: adminDashboardTracker
})

export default rootReducer