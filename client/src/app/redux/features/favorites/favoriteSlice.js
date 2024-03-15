import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action) {
      state.favorites = state.favorites.concat(action.payload);
    },
    // addToFavorites(state, action) {
    //   state.favorites.push(action.payload);
    // },
    removeFromFavorites(state, action) {
      state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
    },
    setUserFavorites(state, action) {
      state.favorites = action.payload;
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites,setUserFavorites  } = favoritesSlice.actions;

export default favoritesSlice.reducer;