import React from 'react';
import styles from './Register.module.css';
import Header from './Header';
import Head from 'Components/Helper/Head';
import Form from './Form';

const Register = () => {
  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

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
