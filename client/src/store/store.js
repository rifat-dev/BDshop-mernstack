import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'


// const initialState = {
//     auth: {
//         user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
//     },
//     cart: {
//         cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('chartItems')) : [],
//         shoppingInfo: localStorage.getItem('shoppingInfo') ? JSON.parse(localStorage.getItem('shoppingInfo')) : {}
//     }
// }

const middleware = [thunk]


const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
)


export default store