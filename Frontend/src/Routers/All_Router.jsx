// src/routers/All_Router.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RegisterPage } from '../User/Pages/RegisterPage';
import { ForgetPasswordPage } from '../Pages/ForgetPasswordPage';
import { HomePage } from '../Pages/HomePage';
import { Dashboard } from '../User/Pages/Dashboard';
import { Sessions } from '../User/Pages/Sessions';
import { ProfilePage } from '../User/Pages/ProfilePage';
import { LoginPage } from '../Pages/LoginPage';
import { PageNotFoundPage } from '../Pages/PageNotFoundPage';

export const All_Router = () => {
  return (

    <Routes>
      {/* Protected Route */}
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/session" element={<Sessions/>} />
      <Route path="/session/:session_id" element={<Sessions/>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/forget_password' element={<ForgetPasswordPage />} />
      <Route path='/forget_password/:token' element={<ForgetPasswordPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/*' element={<PageNotFoundPage />} />
    </Routes>
   
  );
};
