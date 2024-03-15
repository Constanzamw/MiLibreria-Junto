"use client"
import React from "react";
import Link from "next/link";

const FavoriteCard = ({ favorite }) => {
  return (
    <div className="border border-primary rounded p-4 shadow-2xl">
      <Link href={`/book/${favorite._id}`}>
        <h3 className="text-lg font-semibold mb-2 text-center">{favorite.title}</h3>
      </Link>
      <p className="text-md text-center">Autor: {favorite.author}</p>
    </div>
  );
};
export default FavoriteCard;

