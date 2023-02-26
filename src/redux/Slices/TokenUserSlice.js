import {  createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    token: ''
}

const TokenUserSlice = createSlice({
    name: 'TokenUser',
    initialState,
    reducers:{
        GetTokenByCookie: state => {
            const token = localStorage.getItem('token');
            state.token = token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        ClearTokenUser: state => {
            state.token = '';
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = '';
            },
        SetTokenUser: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
            axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
        }
    }
})




export const TokenUserReducer = TokenUserSlice.reducer;
export const {GetTokenByCookie, ClearTokenUser,SetTokenUser } = TokenUserSlice.actions;
