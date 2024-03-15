 "use client"

 import React, { useState } from 'react';
 import { useDispatch } from "react-redux";
 import { loginUser } from "../redux/features/user/userActions";
 import { useRouter } from 'next/navigation';
 import { useEffect } from 'react';
import { Link } from 'react-router-dom';
 const LoginForm = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();
   const router = useRouter();
   

   const handleSubmit = async (e) => {
     e.preventDefault();
    await dispatch(loginUser(email, password));
    
    router.push("/home")
   };
   

   //Hago eso para desabilitar el boton de iniciar sesion.
   const [formValid, setFormValid] = useState(false);
   
  const validateForm = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

    useEffect(() => {
    validateForm();
  }, [email, password]);



   return (
     <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-[90px]">
      <div className="flex flex-col text-center">
        <label className='text-lg' >Correo electrónico: 
          <input type="email" placeholder="Correo electrónico" className='text-black ml-3 text-lg mb-[10px]' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div className="flex flex-col text-center">
        <label className='text-lg' >Contraseña:
         <input type="password" placeholder="Contraseña" className='text-black ml-3 text-lg mb-[35px]'  value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button type="submit" className={`bg-blue-500 text-white px-3 py-2 rounded self-center ${!formValid && 'opacity-50 cursor-not-allowed'}`} disabled={!formValid}>Iniciar sesión</button>
       <p className="text-center">¿Aún no estás registrado? <a href="/register">Crea tu cuenta</a></p>
     </form>
   );
 };
 
 export default LoginForm;

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import Link from 'next/link'

// const LoginForm = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();


//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await axios.get('http://localhost:3000/users/');
//             const users = response.data;

//             const user = users.find(u => u.email === email && u.password === password);
//             if (user) {
               
//                  router.push('/home');
//                 alert('Inicio de sesión exitoso');
//             } else {
//                 setError('Credenciales inválidas');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('Hubo un problema al procesar tu solicitud');
//         }
//     };


//     return (
//         <div>
//             <h2>Iniciar sesión</h2>
//             {error && <p>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                         className='text-black'
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className='text-black'
//                     />
//                 </div>
//                 <button type="submit">Iniciar sesión</button>
//             </form>
//                 <button>
//             <Link href="/register">
//                 Registrarse
//             </Link>
//                 </button>
//         </div>
//     );
// };

// export default LoginForm;