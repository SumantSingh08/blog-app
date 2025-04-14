import {configureStore} from '@reduxjs/toolkit';
import {authReducer, postReducer} from './authSlice';
const store =configureStore({
    reducer:{
        auth: authReducer,
        post: postReducer,
    }
})
console.log("store:",store)

export default store;