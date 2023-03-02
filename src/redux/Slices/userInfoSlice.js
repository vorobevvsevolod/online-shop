import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {URLServer} from "../../Axios";

export const fetchUserInfo = createAsyncThunk('UserInfo/fetchUserInfo', async () =>{
    const responseUserInfo = await axios.get(`${URLServer}/auth/me`)
    return {email: responseUserInfo.data.email, username: responseUserInfo.data.username, phone: responseUserInfo.data.phone}
})


const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState:{
        username: '',
        email: '',
        phone: '',
        status: '',
        error: ''
    },

    reducers:{
        changeEmailUser: (state, action) =>{
            state.email = action.payload
        },
        changeUsername: (state, action) =>{
            state.username = action.payload
        },
        changePhone: (state, action) =>{
            state.phone = action.payload
        },
        clearInfoUser: state => {
            state.username = '';
            state.email = '';
            state.phone = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.phone = action.payload.phone;

            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
})


export const userInfoReducer = userInfoSlice.reducer;
export const {
    changeEmailUser,
    changeUsername,
    changePhone,
    clearInfoUser

} = userInfoSlice.actions