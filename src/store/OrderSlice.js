import { createSlice } from "@reduxjs/toolkit";

//set initiate State
const initialState = {
    cart: [],
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
            state.cart[0] = action.payload
        },
    },
})

export const {addToCart, removeFromCart} = orderSlice.actions;

export default orderSlice.reducer;