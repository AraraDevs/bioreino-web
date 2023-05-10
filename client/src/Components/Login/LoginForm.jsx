import React from 'react';
import styles from './LoginForm.module.css';
import Input from '../Forms/Input';
import { ReactComponent as Scientist } from '../../Assets/login-cientista.svg';
import { Link } from 'react-router-dom';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';

const LoginForm = () => {
  const email = useForm('email');
  const password = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    
    if (email.validate(), password.validate()) {
      console.log('logado');
    }
  }

  return (
    <section className={styles.login}>
      <div className={styles.wrapper}>
        <section className={styles.sectionWelcome}>
          <h2 className={styles.welcome}>Bem-vindo de volta</h2>
          <Scientist />
        </section>

        <section className={styles.sectionForm}>
          <h1 className={styles.loginTitle}>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input label="E-mail" type="email" name="email" {...email} />
            <div className={styles.password}>
              <Input
                label="Senha"
                type="password"
                name="password"
                {...password}
              />
              <p className={styles.sign}>
                Ainda não possui um plano assinado?{' '}
                <Link to="inscreva">Assine aqui</Link>
              </p>
            </div>

            <Button>Entrar</Button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default LoginForm;
