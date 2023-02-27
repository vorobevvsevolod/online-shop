import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URLServer} from "../../Axios";

export const fetchFavorites = createAsyncThunk('cart/fetchFavorites', async () => {
    const responseFavorites = await axios.get(`${URLServer}/favorites`)
    const favorites = responseFavorites.data;
    const promises = favorites.map(async (favorite) => {
        const responseProduct = await axios.get(`${URLServer}/product/${favorite.product_id}`);
        const product = responseProduct.data.result[0]
        const imageResponse = await axios.get(`${URLServer}/product/image/${favorite.product_id}`, { responseType: 'arraybuffer' });
        const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
        product.image_url = URL.createObjectURL(blob);
        favorite.product = product
        delete favorite.product_id
        return favorite
    })
    const updateFavorites = await Promise.all(promises)
    return updateFavorites
});

const favoritesSlice = createSlice({
    name: 'cart',
    initialState: {
        favorites: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearFavorites: state =>{
            state.favorites = [];
        },
        addItemInFavorites: (state, action) =>{
            state.favorites = [...state.favorites, action.payload]
        },
        deleteItemByFavorites: (state, action) =>{
            const index = state.favorites.findIndex(item => item.product.id === action.payload);
            if (index !== -1) {
                state.favorites.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.favorites = action.payload;
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const favoritesArrayReducer =  favoritesSlice.reducer;

export const {
    clearFavorites,
    addItemInFavorites,
    deleteItemByFavorites
} = favoritesSlice.actions;
