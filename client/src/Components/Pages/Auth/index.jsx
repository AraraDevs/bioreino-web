import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const Auth = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="inscreva/:id?" element={<Register />} />
      </Routes>
    </>
  );
};

export default Auth;
