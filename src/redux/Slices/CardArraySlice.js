import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {getReviewsProductAVGById, getReviewsProductByID, URLServer} from "../../Axios";


export const fetchCards = createAsyncThunk('card/fetchCards', async () => {
    const response = await axios.get(`${URLServer}/products`);
    const products = response.data.result;
    const promises = products.map(async (product) => {
        const imageResponse = await axios.get(`${URLServer}/product/image/${product.id}`, { responseType: 'arraybuffer' });
        const reviews = await axios.get(`${URLServer}/product/reviews/${product.id}`);
        const rating = await axios.get(`${URLServer}/product/reviews/avg/${product.id}`);
        try {
            const blob = new Blob([imageResponse.data], { type: imageResponse.headers['content-type'] });
            product.image_url = URL.createObjectURL(blob);
            product.addedCart = false;
            product.favorited = false;
            product.reviews = reviews.data.response;
            product.rating = (rating.data.response !== 'нет оценок') ? Number(rating.data.response).toFixed(1) : 0;
        } catch (e) {
            console.error(e);
        }
        return product
    });
    const updatedProducts = await Promise.all(promises);
    return  updatedProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
});

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setFavoritedCard: (state, action) => {
            state.products.map(item =>{
                if(item.id == action.payload.id) item.favorited = action.payload.flag;
            })
        },
        setFavoritesAndCart: (state, action) =>{
            state.products.map(product =>{
                action.payload.cart.map(cart =>{
                    if(product.id == cart.product_id) product.addedCart = true;
                })
                action.payload.favorites.map(favorite =>{
                    if(product.id == favorite.product_id) product.favorited = true;
                })
            })
        },
        clearFavoriteCartInCard: state =>{
            state.products.map(item =>{
                item.favorited = false;
                item.addedCart = false;
            })
        },
        setAddedCartInCard: (state, action)=>{
            state.products.map(product =>{
                if(product.id == action.payload.id) product.addedCart = action.payload.flag
            })
        },
        newCardArray: (state, action) =>{
            state.products = action.payload;
        },
        updateReviewsRatingProduct: (state, action)=>{
            const reviews = action.payload.reviews;
            reviews.time = '2022-12-03T00-00-00'
            state.products.map(product =>{
                if(product.id == action.payload.id){
                    let rat = 0;
                    product.reviews = [...product.reviews, reviews]
                    product.reviews.map(item =>{
                        rat += Number(item.rating)
                    })
                    product.rating = (rat / product.reviews.length).toFixed(1);
                }
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
                state.products = action.payload;
            })
            .addCase(fetchCards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export const cardArrayReducer =  cardSlice.reducer;

export const {
        setFavoritedCard,
        setFavoritesAndCart,
        clearFavoriteCartInCard,
        setAddedCartInCard,
        newCardArray,
        updateReviewsRatingProduct
    } = cardSlice.actions;
