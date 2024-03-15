"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { registerUser } from "../redux/features/user/userActions"
import { useEffect } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ email, password }));
    router.push('/home');
  };


  const [formValid, setFormValid] = useState(false);
   // Función para validar el formulario
   const validateForm = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  // Llamar a validateForm cada vez que cambie el estado de email o password
  useEffect(() => {
    validateForm();
  }, [email, password]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-[80px]">
    <div className="flex flex-col text-center">
      <label className='text-lg'>Email: 
        <input type="email" placeholder="Correo electrónico" className='text-black text-lg ml-3' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
    </div>
    <div className="flex flex-col text-center">
      <label className='text-lg'>Contraseña
        <input type="password" placeholder="Contraseña" className='text-black text-lg ml-3 mb-3' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
    </div>
    <button type="submit" className={`bg-blue-500 text-white px-3 py-2 rounded self-center ${!formValid && 'opacity-50 cursor-not-allowed'}`} disabled={!formValid}>Registrarse</button>
   
  </form>
);
};

export default RegistrationForm;