import React from 'react';
import styles from './LoginSign.module.css';
import HeaderLoginSign from './HeaderLoginSign';
import Input from '../Forms/Input';
import Select from '../Forms/Select';
import useForm from '../../Hooks/useForm';
import { useParams } from 'react-router-dom';
import Button from '../Forms/Button';
import { UserContext } from '../../Context/UserContext';
import Error from '../Helper/Error';
import { USER_POST } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Head from '../Helper/Head';
import LoginMethodsPayment from './LoginMethodsPayment';
import usePlans from '../../Hooks/usePlans';
import FieldSplit from '../Layout/FieldSplit';

const LoginSign = () => {
  const { id } = useParams();
  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const { allPlans } = usePlans();
  const [hidden, setHidden] = React.useState(true);

  const select = useForm();
  const name = useForm();
  const email = useForm('email');
  const password = useForm();
  const confirmPassword = useForm();
  const cpf = useForm('cpf', { canFormat: true, regex: /\D/g });
  const validity = useForm('validity', { canFormat: true });
  const cvv = useForm('cvv', { canFormat: true, regex: /\D/g });
  const bearerName = useForm();
  const numCard = useForm('numCard', { canFormat: true, regex: /\D/g });

  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

  React.useEffect(() => {
    if (select.value === '' && id) {
      select.setValue(id);
    }
  }, [id, select]);

  const price = getPrice();

  function getPrice() {
    const price = allPlans.find((plan) => plan.name === select.value);

    return price ? price.price : undefined;
  }

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
      bearerName.validate() &&
      numCard.validate() &&
      validity.validate() &&
      cvv.validate() &&
      select.validate()
    ) {
      const { url, options } = USER_POST({
        name: name.value,
        email: email.value,
        password: password.value,
        plan: select.value,
      });
      const { response } = await request(url, options);
      if (response.ok) userLogin(email.value, password.value);
    }
  }

  return (
    <>
      <Head
        title="Inscreva"
        description="Inscreva-se em um de nossos planos para ter acesso aos cursos que oferecemos sobre biologia"
      />
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
              name="confirm_password"
              {...confirmPassword}
            />
            <Input label="CPF *" type="text" name="cpf" max={14} {...cpf} />

            <h2>Plano de assinatura</h2>
            <Select
              label="Selecione um plano *"
              name="plans"
              options={allPlans}
              isCapitalize={true}
              {...select}
            />
            <div className={styles.total}>
              <h2>Total da compra:</h2>
              <span>{price ? `R$ ${price}` : ''}</span>
            </div>

            <h2>Pagamento</h2>
            <LoginMethodsPayment
              selectedPlan={select.value}
              hidden={hidden}
              setHidden={setHidden}
            />

            {/* Aqui em endereço pode usar uma API de CEP para buscar dados com base no CEP e já preencher alguns campos */}
            <div className={hidden ? 'hidden' : ''}>
              <h2>Endereço</h2>
              <FieldSplit>
                <Input label="CEP" name="cep" />
                <Input label="Número" name="number" />
              </FieldSplit>
              <FieldSplit>
                <Input label="Endereço" name="address" />
                <Input label="Bairro" name="neighborhood" />
              </FieldSplit>
              <FieldSplit>
                <Input label="Cidade" name="city" />
                <Input label="Estado" name="state" />
              </FieldSplit>
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
