import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sliderReducer from './sliderReducer'
import { productReducer } from './productReducer'

export default combineReducers({
    authReducer,
    sliderReducer,
    productReducer
})