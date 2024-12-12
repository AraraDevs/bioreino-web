import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/next';

import ProtectedRoute from 'Components/Helper/ProtectedRoute';
import Modal from 'Components/Layout/Modal';
import Register from 'Components/Pages/Auth/Register';
import Login from 'Components/Pages/Auth/Login';

import UserProvider from './Context/User';
import CoursesProvider from './Context/Courses';
import CategoriesProvider from './Context/Categories';
import PlansProvider from './Context/Plans';

const Home = React.lazy(() => import('Components/Pages/Home'));
const Dashboard = React.lazy(() => import('Components/Pages/Dashboard'));
const Lesson = React.lazy(() => import('Components/Pages/Lesson'));

function App() {
  return (
    <>
      <SpeedInsights />
      <BrowserRouter>
        <UserProvider>
          <PlansProvider>
            <CategoriesProvider>
              <Modal />

              <React.Suspense fallback={<div></div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login/*" element={<Login />} />
                  <Route path="/assinar/:plan_name?" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <CoursesProvider>
                          <Dashboard />
                        </CoursesProvider>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/curso/:course/:lesson?"
                    element={
                      <ProtectedRoute>
                        <CoursesProvider>
                          <Lesson />
                        </CoursesProvider>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </React.Suspense>
            </CategoriesProvider>
          </PlansProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
