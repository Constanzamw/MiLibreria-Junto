import {
  addToFavorites, removeFromFavorites, clearFavorites
  } from "./favoriteSlice";
  import axios from "axios";

  const URL_BASE = "http://localhost:3000";


  export const addFavorite = (userId, bookId) => async (dispatch) => {
    try {
      await axios.post(`${URL_BASE}/users/${userId}/favorites`, { bookId });
      dispatch(addToFavorites(bookId));
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
  
  export const removeFavorite = (userId, bookId) => async (dispatch) => {
    try {
      await axios.delete(`${URL_BASE}/users/${userId}/favorites/${bookId}`);
      dispatch(removeFromFavorites(bookId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  export const fetchFavorites = (userId) => async (dispatch) => {
    try {
      dispatch(clearFavorites());
      const response = await axios.get(`${URL_BASE}/users/${userId}/favorites`);
      dispatch(addToFavorites(response.data));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  export const clearAllFavorites = () => (dispatch) => {
    dispatch(clearFavorites());
  };





  