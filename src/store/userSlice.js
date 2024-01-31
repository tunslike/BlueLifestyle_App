import { createSlice } from "@reduxjs/toolkit"; 

//set initiate state
const initialState = {
    userID: null,
    token: null,
    firstName: '',
    userData : [],
    idtkn: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        //update id token 
        updateIdtkn: (state, action) => {
            state.idtkn = action.payload;
        },
        //update user toke
        updateToken: (state, action) => {
            state.token = action.payload;
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

export const {updateFirstname, updateUserID, updateToken, updateUserData, updateIdtkn} = userSlice.actions;

export default userSlice.reducer;