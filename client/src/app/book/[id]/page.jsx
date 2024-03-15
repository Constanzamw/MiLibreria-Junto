"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { deleteBook,updateBook } from "../../redux/features/create/createActions";
import { addFavorite, removeFavorite } from "@/app/redux/features/favorites/favoriteActions";


const BookDetail = ({ params }) => {
  const router = useRouter();
  //const { params } = router;
  const { id } = params;
  const [book, setBook] = useState(null);
  const [editedBook, setEditedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3000/books/${id}`);
          setBook(response.data);
          setEditedBook(response.data);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id, successMessage]);

  const handleClose = () => {
    router.push("/home");
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteBook(id));
      setSuccessMessage("¡Libro eliminado exitosamente!");
      setTimeout(() => {
        router.push("/home"); // Redirige a la página de inicio después de eliminar el libro
      }, 2000);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await dispatch(updateBook(editedBook));
      setSuccessMessage("¡Cambios guardados exitosamente!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({
      ...editedBook,
      [name]: value,
    });
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  //FAVORITES
  const favorites = useSelector(state => state.favorites.favorites);
  const isFavorite = favorites.some(favorite => favorite._id === book?._id);
  const userId = typeof localStorage !== 'undefined' ? localStorage.getItem('userId') : null;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(userId, book._id));
      setSuccessMessage("¡Libro eliminado de favoritos!");
    } else {
      dispatch(addFavorite(userId, book._id));
      setSuccessMessage("¡Libro añadido a favoritos!");
      
    }
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 bg-red-500/40 text-black hover:bg-red-500 hover:text-white px-4 py-2 rounded"
        >
          X
        </button>
      </div>
      {book && (
        <div
          key={book._id}
          className="border-solid border-gray-300 rounded p-4 "
        >
          {!isEditing ? (
            <>
              <h2 className="text-3xl font-bold mb-4 text-primary text-center">
                {book.title}
              </h2>
              <img
                src={book.image}
                alt={book.title}
                className="w-64 h-auto mb-4 mx-auto"
              />
              <p className="text-lg text-black/80 text-center">
                Autor: {book.author}
              </p>
              <p className="text-lg text-black/80 text-center">
                Género: {book.genre}
              </p>
              <p className="text-lg text-black/80 text-center">
                Año de publicación: {book.year}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleEdit}
                  className="bg-primary hover:bg-blue-500 text-white px-4 py-2 rounded mt-4  "
                >
                  Editar
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded mt-4 ml-4 "
                >
                  Eliminar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center mt-4">
                <label className="mb-2 text-lg">
                  Titulo:
                  <input
                    type="text"
                    name="title"
                    className="text-black border border-gray-400 px-3 py-1 rounded mt-1 ml-5 text-lg mb-3"
                    value={editedBook.title}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-2 text-lg">
                  Autor:
                  <input
                    type="text"
                    name="author"
                    className="text-black border border-gray-400 px-3 py-1 rounded mt-1 ml-5 text-lg mb-3"
                    value={editedBook.author}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-2 text-lg">
                  Año:
                  <input
                    type="text"
                    name="year"
                    className="text-black border border-gray-400 px-3 py-1 rounded mt-1 ml-8 text-lg mb-3"
                    value={editedBook.year}
                    onChange={handleInputChange}
                  />
                </label>
                <label className="mb-2 text-lg">
                  Género:
                  <input
                    type="text"
                    name="genre"
                    className="text-black border border-gray-400 px-3 py-1 rounded mt-1 ml-2 text-lg mb-3"
                    value={editedBook.genre}
                    onChange={handleInputChange}
                  />
                </label>
                <button
                  onClick={handleSaveChanges}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4  text-lg"
                >
                  Guardar cambios
                </button>
              </div>
            </>
          )}
          <div className="flex justify-center">
          <button onClick={handleToggleFavorite} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 text-lg">
            {isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
          </button>
        </div>
        </div>
      )}
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
};

export default BookDetail;
