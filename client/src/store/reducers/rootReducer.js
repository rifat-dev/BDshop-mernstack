import { combineReducers } from 'redux'

import {
    authReducer
} from './authReducer'

const rootReducer = combineReducers({
    // user reducers
    auth: authReducer
})

export default rootReducer