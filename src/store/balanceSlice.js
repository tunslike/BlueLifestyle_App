import { createSlice } from "@reduxjs/toolkit";

// set the initial state of the slide
const initialState = {
    value: 0,
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState: initialState,
    reducers: {
        //All the reducers go here
        deposit: (state, action) => {
            state.value += action.payload;
        },
        withdrawal: (state, action) => {
            state.value -= action.payload
        },
    }
});

export const { deposit , withdrawal} = balanceSlice.actions;

export default balanceSlice.reducer;