import React from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from './Components/Pages/Auth';
import Home from './Components/Pages/Home';
import { UserStorage } from './Context/UserContext';
import Dashboard from './Components/Pages/Dashboard';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Lesson from './Components/Pages/Lesson';

const TRACKING_ID = 'G-9CX73DLPH8';
ReactGA.initialize(TRACKING_ID);

function App() {
  React.useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/*" element={<Auth />} />
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
