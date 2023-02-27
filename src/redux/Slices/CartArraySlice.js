import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URLServer} from "../../Axios";

export const fetchCart = createAsyncThunk('cart/fetchCarts', async () => {
    const responseCart = await axios.get(`${URLServer}/cart`)
    const carts = responseCart.data;
    const promises = carts.map(async (cart) => {
        const responseProduct = await axios.get(`${URLServer}/product/${cart.product_id}`);
        const product = responseProduct.data.result[0]
        const imageResponse = await axios.get(`${URLServer}/product/image/${cart.product_id}`, { responseType: 'arraybuffer' });
        const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
        product.image_url = URL.createObjectURL(blob);
        cart.product = product
        delete cart.product_id
        return cart
    })
    const updateCarts = await Promise.all(promises)
    return updateCarts
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        showCart: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        setShowCart: state => {state.showCart = !state.showCart},
        clearCart: state =>{
            state.cart = [];
        },
        addItemInCart: (state, action) =>{
            state.cart = [...state.cart, action.payload]
        },
        deleteItemByCart: (state, action) =>{
            const index = state.cart.findIndex(item => item.product.id === action.payload);
            if (index !== -1) {
                state.cart.splice(index, 1);
            }
        },
        updateQuantityCart: (state, action) =>{
            state.cart.map(item =>{
                if(item.product.id === action.payload.product_id)
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
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const cartArrayReducer =  cartSlice.reducer;

export const {
        clearCart,
        setShowCart,
        addItemInCart,
        deleteItemByCart,
        updateQuantityCart
    } = cartSlice.actions;
