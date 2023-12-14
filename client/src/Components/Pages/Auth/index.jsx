import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import { UserContext } from 'Context/User';

const Auth = () => {
  const { login } = React.useContext(UserContext);

  if (login) return <Navigate to="/dashboard" />;
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
