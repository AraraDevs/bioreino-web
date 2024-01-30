import React from 'react';
import styles from './Register.module.css';
import Header from './Header';
import Head from 'Components/Helper/Head';
import Form from './Form';
import { Navigate } from 'react-router-dom';
import { PlansContext } from 'Context/Plans';
import { UserContext } from 'Context/User';

const Register = () => {
  const { plans } = React.useContext(PlansContext);
  const { data: user } = React.useContext(UserContext);

  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

  if (user) {
    const userPlan = plans.find((plan) => plan._id === user.plan);
    if (userPlan.fullaccess) return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Head
        title="Inscreva"
        description="Inscreva-se em um de nossos planos para ter acesso aos cursos que oferecemos sobre biologia"
      />
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Registre-se e tenha acesso aos cursos do plano selecionado
        </h1>
        <Form />
      </main>
    </>
  );
};

export default Register;
