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
import LoginSignAddress from './LoginSignAddress';

function getPrice(allPlans, fields) {
  const price = allPlans.find((plan) => plan.name === fields.values.plans);

  return price ? price.price : undefined;
}

const LoginSign = () => {
  const { id } = useParams();
  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const { allPlans } = usePlans();
  const [visible, setVisible] = React.useState(false);
  const [methodPayment, setMethodPayment] = React.useState('');

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

  let customValidationRules = {
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
  };

  customValidationRules =
    methodPayment === 'credit_card'
      ? {
          ...customValidationRules,
          card_number: {
            regex: /(?:\d{4}\s){3}\d{4}/,
            message: 'Digite a quantidade correta de dígitos',
          },
          holder_name: { required: true },
          card_validity: {
            regex: /^(0[1-9]|1[0-2])\/\d{2}$/,
            message: 'Preencha uma data válida',
          },
          cvv: {
            regex: /^\d{3}$/,
            message: 'Preencha um CVV válido',
          },
          installments: { required: true },
        }
      : customValidationRules;

  const fields = useForm(initialValue, customValidationRules, {
    card_number: {
      pattern: 'XXXX XXXX XXXX XXXX',
    },
    card_validity: {
      pattern: 'XX/XX',
      customFormatting: (value) => {
        const firstNumberOfTheMonth = Number(value.slice(0));
        if (firstNumberOfTheMonth > 1) {
          return '0' + firstNumberOfTheMonth;
        }
        return value;
      },
    },
    cpf: { pattern: 'XXX.XXX.XXX-XX' },
  });

  React.useEffect(() => {
    // moves the scroll to the beginning of the page
    document.documentElement.scrollTop = 0;
  }, []);

  const price = getPrice(allPlans, fields);

  async function handleSubmit(event) {
    event.preventDefault();

    if (fields.isSubmitValid(event)) {
      // const { url, options } = USER_POST({
      //     name: fields.values.name,
      //     email: fields.values.email,
      //     password: fields.values.password,
      //     plan: fields.values.plans,
      //   });
      //   const { response } = await request(url, options);
      //   if (response.ok) userLogin(fields.values.email, fields.values.password);
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

            <h2>Plano de assinatura</h2>
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

            <h2>Pagamento</h2>
            <LoginMethodsPayment
              methodPayment={methodPayment}
              setMethodPayment={setMethodPayment}
              selectedPlan={fields.values.plans}
              setVisible={setVisible}
            />

            {/* Aqui em endereço pode usar uma API de CEP para buscar dados com base no CEP e já preencher alguns campos */}
            {visible && <LoginSignAddress fields={fields} />}

            {loading ? (
              <Button disabled>Finalizar Compra</Button>
            ) : (
              methodPayment && <Button>Finalizar Compra</Button>
            )}
            {error && <Error error={error} />}
          </form>
        </main>
      </div>
    </>
  );
};

export default LoginSign;
