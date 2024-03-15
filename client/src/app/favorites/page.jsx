"use client"
import Link from "next/link";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites } from "../redux/features/favorites/favoriteActions";
import FavoriteCard from '../components/favoriteCard/favoriteCard';


const FavoritesPage = () => {
  const dispatch = useDispatch();
  // const userId = localStorage.getItem('userId')
  const userId = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;
console.log('userId', userId);
  const favorites = useSelector(state => state.favorites.favorites);
 

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId)); 
    }
  }, [dispatch, userId]);

  return (
    <div>
      <h1 className="text-3xl text-white text-center font-bold my-[35px]  bg-primary">TUS FAVORITOS</h1>
      <div className="grid grid-cols-3 gap-9 px-[60px]">
        {favorites.length > 0 ? (
          favorites.map(favorite => (
            <FavoriteCard key={favorite._id} favorite={favorite} />
          ))
        ) : (
          <p>No hay libros favoritos</p>
        )}
      </div>
      <Link href="/home">
      <button className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded mt-10 ml-8 "> Volver </button></Link>
    </div>
  );
};

export default FavoritesPage;
