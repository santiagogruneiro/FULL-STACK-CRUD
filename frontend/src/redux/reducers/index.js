import {combineReducers} from 'redux'
import carsReducer from './cars.reducer'
import customersReducer from './customers.reducer'
import salesReducer from './sales.reducer'


const rootReducer =  combineReducers({
    customers:customersReducer,
    cars : carsReducer,
    sales : salesReducer
})


export default rootReducer