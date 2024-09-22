import React from 'react';
import styles from './Login.module.css';
import { Analytics } from '@vercel/analytics/react';
import LoginForm from './LoginForm';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { UserContext } from 'Context/User';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

import { ReactComponent as Scientist } from 'src/Assets/login-cientista.svg';
import { ReactComponent as Arrow } from 'src/Assets/arrow.svg';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login) return <Navigate to="/dashboard" />;
  return (
    <div className={styles.login}>
      <Analytics />
      <div className={styles.container}>
        <Link to="/" className={styles.goBack} aria-label="Voltar para a home">
          <Arrow />
          <span>Home</span>
        </Link>
        <section className={styles.welcome}>
          <h2>Bem-vindo de volta</h2>
          <div>
            <Scientist />
          </div>
        </section>
        <div className={styles.forms}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/perdeu" element={<ForgotPassword />} />
            <Route path="/resetar" element={<ResetPassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Login;
