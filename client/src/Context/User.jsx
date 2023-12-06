import React from 'react';
import { LOGIN, LOGIN_VALIDATE_TOKEN, USER_GET } from '../api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();
UserContext.displayName = 'User';

export const UserProvider = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const userLogout = React.useCallback(() => {
    setData(null);
    setLogin(null);
    setError(null);
    setLoading(false);

    window.localStorage.removeItem('token');

    navigate('/login');
  }, [navigate]);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    setData(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setLoading(true);
      setError(null);

      const { url, options } = LOGIN({ email, password });
      const response = await fetch(url, options);
      const { token, message } = await response.json();

      if (!response.ok) throw new Error(message);

      window.localStorage.setItem('token', token);

      await getUser(token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setLoading(true);
          setError(null);

          const { url, options } = LOGIN_VALIDATE_TOKEN(token);
          const response = await fetch(url, options);
          const json = await response.json();

          if (!response.ok) throw json.message;

          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{
        data,
        login,
        loading,
        error,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
