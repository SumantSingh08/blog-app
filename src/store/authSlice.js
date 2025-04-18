import { createSlice } from "@reduxjs/toolkit";

// --- authSlice ---

const initialState = {
    status: false,
    userData: null
}
console.log(initialState)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) =>{
            state.status = true;
            state.userData = action.payload;
        },

        logout:(state) =>{
            state.status = false;
            state.userData = null;
        }
    }
});


export const {login, logout} = authSlice.actions;
export const  authReducer = authSlice.reducer;

// --- PostSlice ---

const initialStatePost = {
    posts: [],
}


const postSlice = createSlice({
    name: "post",
    initialState: initialStatePost,
    reducers: {
        addPost: (state, action) =>{
            
            state.posts.push(action.payload);
            
        },

        removePost: (state, action) =>{
            state.posts = state.posts.filter((post) => post.$id !== action.payload.$id);
        },
    }
});

export const {addPost, removePost} = postSlice.actions;
export const postReducer = postSlice.reducer;

