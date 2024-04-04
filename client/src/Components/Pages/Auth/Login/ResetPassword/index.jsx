import React from 'react';
import stylesBtn from 'Components/Forms/Button.module.css';
import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';
import Head from 'Components/Helper/Head';
import Input from 'Components/Forms/Input';
import Error from 'Components/Helper/Error';
import { RESET_PASSWORD_POST } from 'src/api';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const password = useForm({ type: 'password' });
  const { data, loading, error, request } = useFetch();
  const [key, setKey] = React.useState('');
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const email = params.get('email');
    if (key) setKey(key);
    if (email) setEmail(email);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = RESET_PASSWORD_POST(key, email, {
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  return (
    <section className="animeLeft" onSubmit={handleSubmit}>
      <Head title="Resete sua Senha" description="A senha será resetada" />{' '}
      <h1>Resete a Senha</h1>
      {data ? (
        <p style={{ color: 'rgb(68, 204, 17)' }}>{data.message}</p>
      ) : (
        <form>
          <Input
            label="Nova senha"
            type="password"
            name="password"
            {...password}
          />
          {loading ? (
            <button className={stylesBtn.button} disabled>
              Resetando...
            </button>
          ) : (
            <button className={stylesBtn.button}>Resetar</button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default ResetPassword;
