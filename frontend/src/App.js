import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Main from './main/Main'
import Register from './components/Register'
import Login from './components/Login'
import { useDispatch,  } from 'react-redux';
import { getUser } from './components/authSlice'; 


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser()); 
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
