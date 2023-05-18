import React from 'react';
import styles from './LoginSign.module.css';
import HeaderLoginSign from './HeaderLoginSign';
import Input from '../Forms/Input';
import Select from '../Forms/Select';
import useForm from '../../Hooks/useForm';
import plans from '../../plans';
import { useParams } from 'react-router-dom';
import Button from '../Forms/Button';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';

const LoginSign = () => {
  const { id } = useParams();
  const { userRegister, error, loading } = React.useContext(UserContext);
  const plansArray = plans(id);
  const [price, setPrice] = React.useState(null);
  const select = useForm();
  const name = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const confirmPassword = useForm('password');
  const cpf = useForm('cpf', { canFormat: true, regex: /\D/g });
  const validity = useForm('validity', { canFormat: true });
  const cvv = useForm('cvv', { canFormat: true, regex: /\D/g });

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  React.useEffect(() => {
    if (select.value === '' && id) {
      select.setValue(id);
    }
  }, [id, select]);

  React.useEffect(() => {
    const pricePlans = plansArray.filter(({ name }) => name === select.value);
    if (pricePlans.length) {
      setPrice(pricePlans[0].price);
    }
  }, [plansArray, select]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (password.value !== confirmPassword.value) {
      confirmPassword.setError('As senhas devem ser iguais');
      return;
    }

    if (
      name.validate() &&
      email.validate() &&
      password.validate() &&
      cpf.validate() &&
      confirmPassword.validate() &&
      select.validate()
    ) {
      userRegister(
        name.value,
        email.value,
        password.value,
        cpf.value,
        select.value,
      );
    }
  }

  return (
    <>
      <HeaderLoginSign />

      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Registre-se e tenha acesso aos cursos do plano selecionado
          </h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Dados Pessoais</h2>
            <Input label="Nome completo *" type="text" name="name" {...name} />
            <Input label="Email *" type="email" name="email" {...email} />
            <Input
              label="Senha *"
              type="password"
              name="password"
              {...password}
            />
            <Input
              label="Confirme a Senha *"
              type="password"
              name="confirmPassword"
              {...confirmPassword}
            />
            <Input label="CPF *" type="text" name="cpf" max={14} {...cpf} />

            <h2>Pagamento - cartão de crédito</h2>
            <div className={styles.divider}>
              <Input label="Nome do portador *" name="portador" />
              <Input label="Número do cartão *" name="num_cartao" />
            </div>
            <div className={styles.divider}>
              <Input
                label="Validade *"
                name="validity"
                max={5}
                placeholder="MM/AA"
                {...validity}
              />
              <Input
                label="Código de segurança *"
                type="text"
                name="codigo_seguranca"
                max={3}
                placeholder="CVV"
                {...cvv}
              />
            </div>

            <h2>Dados Finais</h2>
            <Select
              label="Selecione um plano *"
              name="plans"
              options={plansArray}
              {...select}
            />
            <div className={styles.total}>
              <h2>Total da compra:</h2>
              <span>{price}</span>
            </div>
            {loading ? (
              <Button disabled>Finalizar Compra</Button>
            ) : (
              <Button>Finalizar Compra</Button>
            )}
            {error && <Error error={error} />}
          </form>
        </main>
      </div>
    </>
  );
};

export default LoginSign;
