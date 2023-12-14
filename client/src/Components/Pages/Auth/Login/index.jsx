import React from 'react';
import styles from './Login.module.css';
import Input from 'Components/Forms/Input';
import { Link } from 'react-router-dom';
import stylesButton from 'Components/Forms/Button.module.css';
import useForm from 'Hooks/useForm';
import { UserContext } from 'Context/User';
import Error from 'Components/Helper/Error';
import { ReactComponent as Arrow } from 'src/Assets/arrow.svg';
import Head from 'Components/Helper/Head';

import { ReactComponent as VisibilityOff } from 'src/Assets/visibility-off.svg';
import { ReactComponent as VisibilityOn } from 'src/Assets/visibility.svg';

const Login = () => {
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const initialValue = { email: '', password: '' };
  const customValidationRules = {
    email: {
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Preencha um e-mail válido',
    },
    password: true,
  };
  const fields = useForm(initialValue, customValidationRules);
  const { userLogin, loading, error } = React.useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    if (fields.isSubmitValid()) {
      userLogin(fields.values.email, fields.values.password);
    }
  }

  return (
    <section className={styles.login}>
      <Head
        title="Login"
        description="Acesse sua conta para ter acesso aos cursos que oferecemos sobre biologia"
      />
      <div className={styles.wrapper}>
        <Link to="/" className={styles.btnHome} aria-label="Voltar para a home">
          <Arrow />
          <span>Voltar</span>
        </Link>
        <section className={styles.sectionWelcome}>
          <h2 className={styles.welcome}>Bem-vindo de volta</h2>
          <div className={styles.welcomeImg}></div>
        </section>

        <section className={styles.sectionForm}>
          <h1 className={styles.loginTitle}>Login</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              label="E-mail"
              type="email"
              name="email"
              {...fields}
              value={fields.values.email}
            />
            <div className={styles.groupPassword}>
              <Input
                label="Senha"
                type={visiblePassword ? 'text' : 'password'}
                name="password"
                {...fields}
                value={fields.values.password}
              />
              <span
                className={styles.visibility}
                onClick={() => setVisiblePassword(!visiblePassword)}
              >
                {visiblePassword ? <VisibilityOn /> : <VisibilityOff />}
              </span>
            </div>
            <p className={styles.sign}>
              Ainda não possui um plano assinado?{' '}
              <Link to="inscreva">Assine aqui</Link>
            </p>

            {loading ? (
              <button className={stylesButton.button} disabled>
                Entrando...
              </button>
            ) : (
              <button className={stylesButton.button}>Entrar</button>
            )}
            <Error error={error} />
          </form>
        </section>
      </div>
    </section>
  );
};

export default Login;
