import {createSlice} from "@reduxjs/toolkit";

export const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients : [],
        isFetching: false,
        error: false,
    }, 
    reducers :{
          //GET ALL CLIENTS
          getClientsStart: (state) =>{
            state.isFetching = true;
            state.error = false;
        },
        getClientsSuccess : (state, action ) => {
            state.isFetching = false;
            state.clients = action.payload ;
           

        },
        getClientsFailure : (state) =>{
            state.error= true;
        },

    

    //Delete
    deleteClientsStart: (state) =>{
        state.isFetching = true;
        state.error = false;
    },
    deleteClientsSuccess : (state, action ) => {
        state.isFetching = false;
        state.clients.splice(
        state.clients.findIndex((item)=> item._id === action.payload), 1
        );
    },
    deleteClientsFailure: (state) =>{
        state.error= true;
    },
    //UPDATE

    updateClientsStart: (state) =>{
        state.isFetching = true;
        state.error = false;
    },
    updateClientsSuccess : (state, action ) => {
        state.isFetching = false;
        state.clients[state.clients.findIndex((item)=> item._id === action.payload.id)] = action.payload.client;
        
    },
    updateClientsFailure: (state) =>{
        state.error= true;
    },
     //ADD NEW CLIENT

     addClientsStart: (state) =>{
        state.isFetching = true;
        state.error = false;
    },
    addClientsSuccess : (state, action ) => {
        state.isFetching = false;
        state.clients.push(action.payload);
        
    },
    addClientsFailure: (state) =>{
        state.error= true;
    }
    }
});

export const { getClientsStart, getClientsSuccess, getClientsFailure,
deleteClientsStart, deleteClientsSuccess, deleteClientsFailure, 
updateClientsStart, updateClientsSuccess, updateClientsFailure, 
addClientsStart, addClientsSuccess, addClientsFailure} = clientSlice.actions;
export default clientSlice.reducer; 