import { createSlice } from "@reduxjs/toolkit";

let initialState = []

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers : {
        addUser:{
            reducer(state, action){
                state.push(action.payload)
            },
            prepare(name, id){
                return
            }
        }
    }
})

export const getAllUser = state => state.users
export const {addUser} = userSlice.actions
export default userSlice.reducer