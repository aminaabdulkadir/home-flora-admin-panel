import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState : {
        currentUser: null,
        isFetching: false ,
        error: false
    },
    reducers :{
        //LOGIN

        loginStart: (state)=>{
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state,action) => {
            state.isFetching = false;
            state.currentUser = (action.payload);
            
        },
        loginFailure: (state) => {
            state.error = true;
        },
        
        //LOGOUT

        logoutSuccess: (state) =>{
            state.currentUser = null
        }
    },


});



export const {loginStart, loginSuccess, loginFailure, logoutSuccess} = userSlice.actions;
export default userSlice.reducer;