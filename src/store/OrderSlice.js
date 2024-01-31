import { createSlice } from "@reduxjs/toolkit";
import { utilities } from "../constants";

//set initiate State
const initialState = {
    cart: [],
    providerID: ''
}

export const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload]
            console.log(state.cart.length)
        },
        removeFromCart: (state, action) => {

            const findIndex = state.cart.findIndex(a => a.menuID === action.payload)
            findIndex !== -1 && state.cart.splice(findIndex , 1)

            //state.cart = [...state.cart, arr]
            console.log(state.cart.length)
        },
        clearCart: (state, action) => {
            state.cart.splice(0, state.cart.length);
            console.log(state.cart.length)
        },
        updateProviderID: (state, action) => {
            state.providerID = action.payload
        }

    },
})

export const {addToCart, removeFromCart, clearCart, updateProviderID} = orderSlice.actions;

export default orderSlice.reducer;