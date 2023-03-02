import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URLServer} from "../../Axios";

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    const responseOrders = await axios.get(`${URLServer}/orders`)
    return responseOrders.data
});
const OrdersSlice = createSlice({
    name: 'orders',
    initialState:{
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})


export const OrdersReducer = OrdersSlice.reducer;