import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URLServer} from "../../Axios";


export const fetchCards = createAsyncThunk('card/fetchCards', async (config) => {
    const responseProducts = await axios.get(`${URLServer}/products?offset=${config.offset}&sort=${config.sort}&search=${config.search ? config.search : ''}`);
    const products = responseProducts.data.result;
    const promises = products.map(async (product) => {
        const imageResponse = await axios.get(`${URLServer}/product/image/${product.id}`, { responseType: 'arraybuffer' });
        try {
            const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
            product.image_url = URL.createObjectURL(blob);
            product.addedCart = false;
            product.favorited = false;
        } catch (e) {
            console.error(e);
        }
        return product
    });
    const updatedProducts = await Promise.all(promises);
    return  {products: updatedProducts, totalCount: Number(responseProducts.data.total)};
});

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        products: [],
        totalCount: 0,
        sortMethod: 'rating',
        status: 'idle',
        startLoading: false,
        error: null,
    },
    reducers: {
        setCart: (state, action) =>{
            state.products.map(product =>{
                action.payload.map(cart =>{
                    if(product.id === cart.product.id) product.addedCart = true;
                })
            })
        },
        setFavorites: (state, action) =>{
            state.products.map(product =>{
                action.payload.map(cart =>{
                    if(product.id == cart.product.id) product.favorited = true;
                })
            })
        },
        clearFavoriteCartInCard: state =>{
            state.products.map(item =>{
                item.favorited = false;
                item.addedCart = false;
            })
        },
        clearCartInCard: state =>{
            state.products.map(item =>{
                item.addedCart = false;
            })
        },
        setAddedCartInCard: (state, action)=>{
            state.products.map(product =>{
                if(product.id == action.payload.id) product.addedCart = action.payload.flag
            })
        },
        setFavoritedCard: (state, action) => {
            state.products.map(item =>{
                if(item.id == action.payload.id) item.favorited = action.payload.flag;
            })
        },
        newCardArray: (state, action) =>{
            state.products = action.payload;
        },
        addItemsInCard: (state, action) =>{
            let products = state.products;
            products.concat(action.payload)
            state.products = products
        },
        updateReviewsRatingProduct: (state, action)=>{
            const rating = action.payload.rating;

            state.products.map(product =>{
                if(product.id == action.payload.id){
                    product.reviews++;
                    product.rating = rating;
                }
            })
        },
        setSortMethod: (state, action) =>{
            state.sortMethod = action.payload
        },
        updateCountProduct: (state, action) =>{
            state.products.map(product =>{
                action.payload.map(item =>{
                    if(product.id === item.id) product.count = product.count - item.quantity;
                })
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCards.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.products = state.products.concat(action.payload.products) ;
                    state.totalCount = Number(action.payload.totalCount);
                    state.startLoading = true;
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const cardArrayReducer =  cardSlice.reducer;

export const {
        setCart,
        setFavorites,
        setFavoritedCard,
        clearFavoriteCartInCard,
        setAddedCartInCard,
        newCardArray,
        updateReviewsRatingProduct,
        setSortMethod,
        clearCartInCard,
        updateCountProduct,
        changeTotalCount
    } = cardSlice.actions;
