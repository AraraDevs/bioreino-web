import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginSign from './LoginSign';

const Login = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="inscreva/:id?" element={<LoginSign />} />
      </Routes>
    </>
  );
};

export default Login;
