

import { combineReducers } from "redux";
import mainReducer from "./mainReducers";
import cartItemsReducer from "./cartItemsReducers";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

export default combineReducers({
    main: mainReducer,
    cart: cartItemsReducer,
    auth: authReducer,
    errors: errorReducer
})