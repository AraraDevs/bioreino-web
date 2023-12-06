import React from 'react';
import styles from './Register.module.css';
import Header from './Header';
import Input from '../../../Forms/Input';
import Select from '../../../Forms/Select';
import useForm from '../../../../Hooks/useForm';
import { useParams } from 'react-router-dom';
import Button from '../../../Forms/Button';
import { UserContext } from '../../../../Context/User';
import Error from '../../../Helper/Error';
import { USER_POST } from '../../../../api';
import useFetch from '../../../../Hooks/useFetch';
import Head from '../../../Helper/Head';
import Payments from './Payments';
import usePlans from '../../../../Hooks/usePlans';
import Address from './Address';
import Subtitle from './Subtitle';

function getPrice(allPlans, fields) {
  const price = allPlans.find((plan) => plan.name === fields.values.plans);

  return price?.price;
}

function getCustomValidationRules(initialValue, methodPayment, addressVisible) {
  let value = initialValue;

  if (methodPayment === 'credit_card') {
    value = {
      ...value,
      card_number: {
        regex: /(?:\d{4}\s){3}\d{4}/,
        message: 'Digite a quantidade correta de dígitos',
      },
      holder_name: true,
      card_validity: {
        regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
        message: 'Preencha uma data válida',
      },
      cvv: {
        regex: /^\d{3}$/,
        message: 'Preencha um CVV válido',
      },
      installments: true,
    };
  }

  if (addressVisible) {
    value = {
      ...value,
      cep: {
        regex: /^[0-9]{8}$/,
        message: 'Digite a quantidade correta de dígitos',
      },
      number: true,
      address: true,
      neighborhood: true,
      city: true,
      state: true,
    };
  }
  return value;
}

const Register = () => {
  const { id } = useParams();
  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const { allPlans } = usePlans();
  const [addressVisible, setAddressVisible] = React.useState(false);
  const [methodPayment, setMethodPayment] = React.useState('');

  const customValidationRules = getCustomValidationRules(
    {
      name: true,
      email: {
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Preencha um e-mail válido',
      },
      password: {
        regex: /^.{8,}/,
        message: 'A senha precisa ter pelo menos 8 caracteres',
      },
      confirm_password: {
        customValidation: (value, values) => {
          if (value !== values.password) {
            return 'As senhas devem ser iguais';
          }
        },
      },
      cpf: {
        regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
        message: 'Preencha um cpf válido',
      },
      plans: true,
    },
    methodPayment,
    addressVisible,
  );

  const initialValue = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    cpf: '',
    plans: id || '',
    card_number: '',
    holder_name: '',
    card_validity: '',
    cvv: '',
    installments: '',
    cep: '',
    number: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
  };

  const customFormattingRules = {
    card_number: {
      pattern: 'XXXX XXXX XXXX XXXX',
    },
    card_validity: {
      pattern: 'XX/XX',
      customFormatting: (value) => {
        const firstNumberOfTheMonth = Number(value.charAt(0));
        if (firstNumberOfTheMonth > 1) {
          return '0' + firstNumberOfTheMonth;
        }
        return value;
      },
    },
    cpf: { pattern: 'XXX.XXX.XXX-XX' },
  };
  const fields = useForm(
    initialValue,
    customValidationRules,
    { cvv: 3, cep: 8 },
    customFormattingRules,
  );

  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

  const price = getPrice(allPlans, fields);

  async function handleSubmit(event) {
    event.preventDefault();

    if (fields.isSubmitValid()) {
      const { url, options } = USER_POST({
        name: fields.values.name,
        email: fields.values.email,
        password: fields.values.password,
        plan: fields.values.plans,
      });
      const { response } = await request(url, options);
      if (response.ok) userLogin(fields.values.email, fields.values.password);
    }
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <Subtitle>Dados Pessoais</Subtitle>
          <Input
            label="Nome completo *"
            type="text"
            name="name"
            {...fields}
            value={fields.values.name}
          />
          <Input
            label="Email *"
            type="email"
            name="email"
            {...fields}
            value={fields.values.email}
          />
          <Input
            label="Senha *"
            type="password"
            name="password"
            {...fields}
            value={fields.values.password}
          />
          <Input
            label="Confirme a Senha *"
            type="password"
            name="confirm_password"
            {...fields}
            value={fields.values.confirm_password}
          />
          <Input
            label="CPF *"
            type="text"
            name="cpf"
            max={14}
            {...fields}
            value={fields.values.cpf}
          />

          <Subtitle>Plano de assinatura</Subtitle>
          <Select
            label="Selecione um plano *"
            name="plans"
            options={allPlans}
            isCapitalize={true}
            {...fields}
            value={fields.values.plans}
          />
          <div className={styles.total}>
            <h2>Total da compra:</h2>
            <span>{price ? `R$ ${price}` : ''}</span>
          </div>

          <Subtitle>Pagamento</Subtitle>
          <Payments
            methodPayment={methodPayment}
            setMethodPayment={setMethodPayment}
            fields={fields}
            selectedPlan={fields.values.plans}
            setAddressVisible={setAddressVisible}
          />

          {addressVisible && <Address fields={fields} />}

          {loading ? (
            <Button disabled>Finalizar Compra</Button>
          ) : (
            methodPayment && <Button>Finalizar Compra</Button>
          )}
          {error && <Error error={error} />}
        </form>
      </main>
    </>
  );
};

export default Register;
