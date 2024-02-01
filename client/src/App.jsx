import React from 'react';
import './App.css';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './Components/Helper/ProtectedRoute';
import Modal from 'Components/Layout/Modal';
import Register from 'Components/Pages/Auth/Register';
import Login from 'Components/Pages/Auth/Login';

import UserProvider from './Context/User';
import CoursesProvider from './Context/Courses';
import CategoriesProvider from './Context/Categories';
import PlansProvider from './Context/Plans';

const Home = React.lazy(() => import('./Components/Pages/Home'));
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
        <PlansProvider>
          <CategoriesProvider>
            <Modal />

            <React.Suspense fallback={<p>Carregando...</p>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/login"
                  element={
                    <UserProvider>
                      <Login />
                    </UserProvider>
                  }
                />
                <Route
                  path="/comprar/:plan_name?"
                  element={
                    <UserProvider>
                      <Register />
                    </UserProvider>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <UserProvider>
                      <ProtectedRoute>
                        <CoursesProvider>
                          <Dashboard />
                        </CoursesProvider>
                      </ProtectedRoute>
                    </UserProvider>
                  }
                />
                <Route
                  path="/curso/:course/:lesson?"
                  element={
                    <UserProvider>
                      <ProtectedRoute>
                        <CoursesProvider>
                          <Lesson />
                        </CoursesProvider>
                      </ProtectedRoute>
                    </UserProvider>
                  }
                />
              </Routes>
            </React.Suspense>
          </CategoriesProvider>
        </PlansProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
