import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginSign from './LoginSign';

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="inscreva" element={<LoginSign />} />
      </Routes>
    </div>
  );
};

export default Login;
