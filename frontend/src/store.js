import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducers,
    user:userLoginReducers
})

const cartItemsFromStorage=localStorage.getItem('cartItems')
                           ?JSON.parse(localStorage.getItem('cartItems'))
                           :[]
const initialState = {
    cart:{cartItems:cartItemsFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store