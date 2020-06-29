import { combineReducers } from 'redux'
import authReducer from './authReducer'
import sliderReducer from './sliderReducer'

export default combineReducers({
    authReducer,
    sliderReducer
})