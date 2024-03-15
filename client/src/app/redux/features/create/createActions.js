import {
  createBookStart, createBookSuccess ,createBookFailure ,updateBookStart,  updateBookSuccess,  updateBookFailure, deleteBookStart, deleteBookSuccess, deleteBookFailure
  } from "./createSlice";
  import axios from "axios";

  const URL_BASE = "http://localhost:3000";

  
  export const createBook = (formData) => async (dispatch) => {
    dispatch(createBookStart());
    try {
      const response = await axios.post( `${URL_BASE}/books`, formData);
      dispatch(createBookSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(createBookFailure(error.message));
      throw error;
    }
  };
  export const updateBook = (bookData) => async (dispatch) => {
    dispatch(updateBookStart());
    try {
      const response = await axios.put(`${URL_BASE}/books/${bookData._id}`, bookData);
      dispatch(updateBookSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(updateBookFailure(error.message));
      throw error;
    }
  };
  export const deleteBook = (id) => async (dispatch) => {
    dispatch(deleteBookStart());
    try {
      await axios.delete(`${URL_BASE}/books/${id}`);
      dispatch(deleteBookSuccess(id));
    } catch (error) {
      dispatch(deleteBookFailure(error.message));
      throw error;
    }
  };

//   export const getUser = async () => {
//     try {
//         const response = await axios.get(`${URL_BASE}/users`);
//         const users = response.data;
//         const [access, setAccess] = useState(false);

//         const user = users.find(u => u.email === email && u.password === password);
//         if (user) {
//             setAccess(true)
//             router.push('/home');
//            alert('Inicio de sesión exitoso');
//        } else {
//            setError('Credenciales inválidas');
//        }
//    } catch (error) {
//        console.error('Error:', error);
//        setError('Hubo un problema al procesar tu solicitud');
//    }}




  