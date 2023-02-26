import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URLServer} from "../../Axios";

export const fetchCart = createAsyncThunk('cart/fetchCarts', async () => {
    const responseCart = await axios.get(`${URLServer}/cart`)
    const responseFavorites = await axios.get(`${URLServer}/favorites`)
    const cart = responseCart.data;
    const favorites = responseFavorites.data;
    return {cart: cart, favorites: favorites}
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        favorites: [],
        showCart: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setShowCart: state => {state.showCart = !state.showCart},
        clearCartAndFavorites: state =>{
            state.cart = [];
            state.favorites = [];
        },
        addItemInCart: (state, action) =>{
            state.cart = [...state.cart, action.payload]
        },
        deleteItemByCart: (state, action) =>{
            const index = state.cart.findIndex(item => item.product_id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        updateQuantityCart: (state, action) =>{
            state.cart.map(item =>{
                if(item.product_id === action.payload.product_id)
                    item.quantity = action.payload.quantity
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cart = action.payload.cart;
                state.favorites = action.payload.favorites;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const cartArrayReducer =  cartSlice.reducer;

export const {
        clearCartAndFavorites,
        setShowCart,
        addItemInCart,
        deleteItemByCart,
        updateQuantityCart
    } = cartSlice.actions;
