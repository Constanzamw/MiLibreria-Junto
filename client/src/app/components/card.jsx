"use client"
import Link from "next/link";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
//import { RiHeartLine,RiHeartFill } from "react-icons/ri";
//<RiHeartLine /> <RiHeartFill />



export default function Card() { 
    const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
      const fetchBooks = async () => {
          try {
              const response = await axios.get('http://localhost:3000/books/');
              setBooks(response.data);
          } catch (error) {
              console.error('Error fetching books:', error);
          }
      };

      fetchBooks();
  }, []);


  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 bg-primary text-center text-white ">LIBROS</h2>
      <div className="grid grid-cols-3 gap-9 px-[60px]">
        {books.map(book => (
            <div key={book._id} className="border border-primary rounded p-4 shadow-2xl ">
              
            <Link href={`/book/${book._id}`}>
              <h3 className="text-lg font-semibold mb-2 text-center ">{book.title}</h3>
              <p className="text-md text-center">Autor: {book.author}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};