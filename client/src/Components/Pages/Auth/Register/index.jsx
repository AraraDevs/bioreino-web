import React from 'react';
import styles from './Register.module.css';
import Header from './Header';
import { Navigate } from 'react-router-dom';
import { PlansContext } from 'Context/Plans';
import { UserContext } from 'Context/User';
import UpgradeAccount from './UpgradeAccount';
import CreateAccount from './CreateAccount';

const Register = () => {
  const { plans } = React.useContext(PlansContext);
  const { loading, login, data: user } = React.useContext(UserContext);

  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

  if (loading) return null;
  if (login) {
    const userPlan = plans.find((plan) => plan._id === user.plan);
    if (userPlan.fullaccess) return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Header />
      <main className={styles.main}>
        {login ? <UpgradeAccount /> : <CreateAccount />}
      </main>
    </>
  );
};

export default Register;
