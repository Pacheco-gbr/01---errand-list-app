import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const userLoggedSlice = createSlice({
    name: 'userlogged',
    initialState,
    reducers: {
        setID(state, action){
            return action.payload
        },
        removeID(state){
            state = initialState
        }
    }
})

