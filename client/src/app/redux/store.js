"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./features/user/userSlice"
import favoritesReducer from "./features/favorites/favoriteSlice"
import booksReducer from "./features/create/createSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer ,
       
        favorites:favoritesReducer,
        books:booksReducer
    }
    
    
});

console.log('Estado de Redux después de configurar el store:', store.getState());