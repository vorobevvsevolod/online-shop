import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URLServer} from "../../Axios";


export const fetchCards = createAsyncThunk('card/fetchCards', async (offset) => {

    const responseProducts = await axios.get(`${URLServer}/products?offset=${offset}`);
    const responseTotalCount = await axios.get(`${URLServer}/products/count`);
    const products = responseProducts.data.result;
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
    return  {products: updatedProducts, totalCount: responseTotalCount.data.count};
});

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        products: [],
        totalCount: 0,
        sortMethod: 'rating',
        status: 'idle',
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
        },
        setSortMethod: (state, action) =>{
            state.sortMethod = action.payload
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
        setSortMethod
    } = cardSlice.actions;
