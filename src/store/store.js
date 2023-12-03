import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import orderReducer from './OrderSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer
    }
})