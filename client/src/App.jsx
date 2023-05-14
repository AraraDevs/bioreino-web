import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { UserStorage } from './UserContext';

function App() {
  return (
    <>
      <UserStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserStorage>
    </>
  );
}

export default App;
