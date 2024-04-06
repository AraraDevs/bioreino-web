import React from 'react';
import stylesBtn from 'Components/Forms/Button.module.css';
import Input from 'Components/Forms/Input';
import Head from 'Components/Helper/Head';
import useForm from 'Hooks/useForm';
import { FORGOT_PASSWORD_POST } from 'src/api';
import useFetch from 'Hooks/useFetch';
import Error from 'Components/Helper/Error';

const ForgotPassword = () => {
  const email = useForm({ type: 'email' });
  const { data, loading, error, request } = useFetch();

  function handleSubmit(e) {
    e.preventDefault();
    if (email.validate()) {
      const { url, options } = FORGOT_PASSWORD_POST({ email: email.value });
      request(url, options);
    }
  }

  return (
    <section className="animeLeft" onSubmit={handleSubmit}>
      <Head title="Esqueceu a Senha" description="Troque sua senha" />{' '}
      <h1>Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: 'rgb(68, 204, 17)', textAlign: 'center' }}>{data.message}</p>
      ) : (
        <form>
          <Input label="Email" type="email" name="email" {...email} />
          {loading ? (
            <button className={stylesBtn.button} disabled>
              Enviando...
            </button>
          ) : (
            <button className={stylesBtn.button}>Enviar Email</button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default ForgotPassword;
