import { configureStore} from '@reduxjs/toolkit';
import {TokenUserReducer} from "./Slices/TokenUserSlice";
import {cardArrayReducer} from "./Slices/CardArraySlice";
import {cartArrayReducer} from "./Slices/CartArraySlice";
import {favoritesArrayReducer} from "./Slices/favoritesArraySlice";
import {userInfoReducer} from "./Slices/userInfoSlice";
import {OrdersReducer} from "./Slices/OrdersSlice";
const store = configureStore({
    reducer: {
        tokenUser: TokenUserReducer,
        card: cardArrayReducer,
        cart: cartArrayReducer,
        favorites: favoritesArrayReducer,
        userInfo: userInfoReducer,
        orders: OrdersReducer
    }
})

export default store;