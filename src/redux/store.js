import { configureStore} from '@reduxjs/toolkit';
import {TokenUserReducer} from "./Slices/TokenUserSlice";
import {cardArrayReducer} from "./Slices/CardArraySlice";
import {cartArrayReducer} from "./Slices/CartArraySlice";
import {favoritesArrayReducer} from "./Slices/favoritesArraySlice";
const store = configureStore({
    reducer: {
        tokenUser: TokenUserReducer,
        card: cardArrayReducer,
        cart: cartArrayReducer,
        favorites: favoritesArrayReducer
    }
})

export default store;