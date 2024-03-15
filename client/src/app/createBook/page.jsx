"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook } from "../redux/features/create/createActions";
import { useRouter } from 'next/navigation';

const CreateBookForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Verificar si el campo es "year"
    if (name === 'year') {
      // Verificar si el valor es un número y tiene como máximo 4 caracteres
      if (!(/^\d{1,4}$/.test(value))) {
        // Si no cumple con la validación, mostrar un mensaje de error
        alert('Por favor, ingrese un año válido (máximo 4 dígitos).');
        return;
      }
    }


    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.author && formData.genre && formData.year && formData.image) {
      dispatch(createBook(formData))
        .then(() => {
          
          setFormData({
            title: '',
            author: '',
            genre: '',
            year: '',
            image: ''
          });
        })
        .catch((error) => {
          console.error('Error al crear el libro:', error);
        });
    }
  };

  const router = useRouter();
  const handleGoHome = () => {
    router.push('/home');
  };

  const isValidUrl = (url) => {
    // Expresión regular para verificar una URL
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const isFormValid = formData.title && formData.author && formData.genre && formData.year && formData.image;

  return  (
    <div className="flex flex-col justify-center items-center h-screen">
    <form onSubmit={handleSubmit} className="w-[350px] p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="mb-4 text-xl">
        <label className='mr-2' >Título:</label>
        <input type="text" name="title" className='text-black' value={formData.title} onChange={handleChange} />
      </div>
      <div className="mb-4 text-xl">
        <label className='mr-2' > Autor:</label>
        <input type="text" name="author"  className='text-black' value={formData.author} onChange={handleChange} />
      </div>
      <div className="mb-4 text-xl">
        <label className='mr-2' > Género:</label>
        <input type="text" name="genre"  className='text-black' value={formData.genre} onChange={handleChange} />
      </div>
      <div className="mb-4 text-xl">
        <label className='mr-2' > Año de publicación:</label>
        <input type="text" name="year"  className='text-black' value={formData.year} onChange={handleChange}  />
      </div>
      <div className="mb-4 text-xl">
        <label className='mr-2' >Imagen:</label>
        <input type="text" name="image"  className='text-black' value={formData.image} onChange={handleChange} placeholder='ingrese url de imagen' />
      </div>
      <button type="submit" disabled={!isFormValid || loading} className="w-full bg-primary text-white px-4 py-2 rounded disabled:opacity-50">Guardar</button>
    </form>
    {loading && <p>Cargando...</p>}
    {error && <p>Error al crear el libro: {error}</p>}
    <button onClick={handleGoHome} className="mt-4">Volver a Inicio </button>
  </div>
);
  }
   

export default CreateBookForm;