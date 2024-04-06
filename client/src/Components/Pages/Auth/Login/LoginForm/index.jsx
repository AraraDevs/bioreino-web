import React from 'react';
import styles from './LoginForm.module.css';
import Input from 'Components/Forms/Input';
import { Link } from 'react-router-dom';
import stylesBtn from 'Components/Forms/Button.module.css';
import useForm from 'Hooks/useForm';
import { UserContext } from 'Context/User';
import Error from 'Components/Helper/Error';
import Head from 'Components/Helper/Head';
import InputPasswordVisibility from 'Components/Layout/InputPasswordVisibility';

const LoginForm = () => {
  const { userLogin, loading, error } = React.useContext(UserContext);

  const email = useForm({ type: 'email' });
  const password = useForm({ type: 'password' });

  function handleSubmit(event) {
    event.preventDefault();

    if (email.validate() && password.validate()) {
      userLogin(email.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head
        title="Login"
        description="Acesse sua conta para ter acesso aos cursos que oferecemos sobre biologia"
      />
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="E-mail" type="email" name="email" {...email} />
        <InputPasswordVisibility label="Senha" passwordFormProps={password} />
        <p className={styles.suggestions}>
          Perdeu a Senha? <Link to="/login/perdeu">Clique aqui</Link>.
        </p>
        <p className={styles.suggestions}>
          Não possui um plano assinado? <Link to="/assinar">Assine aqui</Link>.
        </p>

        {loading ? (
          <button className={stylesBtn.button} disabled>
            Entrando...
          </button>
        ) : (
          <button className={stylesBtn.button}>Entrar</button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginForm;
