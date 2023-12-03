import { createSlice } from "@reduxjs/toolkit"; 

//set initiate state
const initialState = {
    userID: null,
    userToken: null,
    firstName: '',
    userData : []
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        //update user toke
        updateUserToken: (state, action) => {
            state.userToken = action.payload;
        },
        updateFirstname: (state, action) => {
            state.firstName = action.payload;
        },
        updateUserID: (state, action) => {
            state.userID = action.payload
        },
        updateUserData: (state, action) => {
            state.userData = action.payload
        }
    },
})

export const {updateFirstname, updateUserID, updateUserToken, updateUserData} = userSlice.actions;

export default userSlice.reducer;