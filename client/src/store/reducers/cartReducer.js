import { ADD_TO_CART, REMOVE_ITEM_TO_CART } from '../Types/cartType'

export const cartReducer = (state = { cartItems: [], shippinginfo: {} }, action) => {
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
        default:
            return state
    }
}