import {
    ADD_TO_CART,
    CLEARE_CART,
    REMOVE_ITEM_TO_CART,
    SAVE_SHIPPING_INFO
} from '../Types/cartType'

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            const isExit = state.cartItems.find(p => p._id === item._id)
            if (isExit) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(p => p._id === isExit._id ? item : p)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_TO_CART:
            const id = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter(p => p._id !== id)
            }
        case SAVE_SHIPPING_INFO:
            // console.log(action)
            return {
                ...state,
                shippingInfo: action.payload.address
            }
        case CLEARE_CART:
            return {
                ...state,
                cartItems: [],
                shippingInfo: {}
            }
        default:
            return state
    }
}