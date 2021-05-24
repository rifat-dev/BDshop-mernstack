import { combineReducers } from 'redux'

import {
    authReducer,
    userReducer
} from './authReducer'

const rootReducer = combineReducers({
    // user reducers
    auth: authReducer,
    user: userReducer
})

export default rootReducer