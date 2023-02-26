import { configureStore} from '@reduxjs/toolkit';
import {TokenUserReducer} from "./Slices/TokenUserSlice";
import {cardArrayReducer} from "./Slices/CardArraySlice";
import {cartArrayReducer} from "./Slices/CartArraySlice";
const store = configureStore({
    reducer: {
        tokenUser: TokenUserReducer,
        card: cardArrayReducer,
        cartFavorites: cartArrayReducer,
    }
})

export default store;