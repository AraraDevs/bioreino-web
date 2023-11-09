import React from 'react';
import './App.css';
import ReactGA from 'react-ga';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { UserStorage } from './Context/UserContext';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Lesson from './Components/Lesson/Lesson';

const TRACKING_ID = 'G-9CX73DLPH8';
ReactGA.initialize(TRACKING_ID);

function App() {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/curso/:course/:lesson?"
              element={
                <ProtectedRoute>
                  <Lesson />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
