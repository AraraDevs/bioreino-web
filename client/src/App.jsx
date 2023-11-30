import React from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserStorage } from './Context/UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';

const Home = React.lazy(() => import('./Components/Pages/Home'));
const Auth = React.lazy(() => import('./Components/Pages/Auth'));
const Dashboard = React.lazy(() => import('./Components/Pages/Dashboard'));
const Lesson = React.lazy(() => import('./Components/Pages/Lesson'));

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
          <React.Suspense fallback={<p>Carregando...</p>}>
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
          </React.Suspense>
        </UserStorage>
      </BrowserRouter>
    </>
  );
}

export default App;
