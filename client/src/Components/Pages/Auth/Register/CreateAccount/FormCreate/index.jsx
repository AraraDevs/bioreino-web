import React from 'react';
import styles from './Form.module.css';
import { useParams } from 'react-router-dom';
import useFetch from 'Hooks/useFetch';
import useForm from 'Hooks/useForm';
import { UserContext } from 'Context/User';
import { PlansContext } from 'Context/Plans';
import { USER_POST } from 'src/api';
import Subtitle from '../../Subtitle';
import Input from 'Components/Forms/Input';
import Select from 'Components/Forms/Select';
import Payments from './Payments';
import Address from './Address';
import Button from 'Components/Forms/Button';
import Error from 'Components/Helper/Error';
import Label from 'Components/Forms/Label';

const FormCreate = () => {
  const { plan_name } = useParams();
  const { plans } = React.useContext(PlansContext);
  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  const [addressVisible, setAddressVisible] = React.useState(false);
  const [methodPayment, setMethodPayment] = React.useState('');
  const [select, setSelect] = React.useState(() =>
    plans.find((plan) => plan.name === plan_name)
  );
  React.useEffect(() => {
    if (select === undefined) {
      setSelect(plans[0]);
    }
  }, [plans, select]);
  const [price, setPrice] = React.useState(0);

  const name = useForm({ name: 'name' });
  const email = useForm({ name: 'email', type: 'email' });
  const password = useForm({ name: 'password', type: 'password' });
  const confirm_password = useForm(
    { name: 'confirm_password' },
    (value, setError) => {
      if (password.value !== value) {
        setError('As senhas devem ser iguais');
        return false;
      }
      return true;
    }
  );
  const cpf = useForm({ type: 'cpf', name: 'cpf' }, null, 'XXX.XXX.XXX-XX');
  const card_number = useForm(
    { name: 'card_number' },
    (value, setError) => {
      if (!/(?:\d{4}\s){3}\d{4}/.test(value)) {
        setError('Digite a quantidade correta de dígitos');
        return false;
      }
      return true;
    },
    'XXXX XXXX XXXX XXXX'
  );
  const holder_name = useForm({ name: 'holder_name' });
  const card_validity = useForm(
    { name: 'card_validity' },
    (value, setError) => {
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
        setError('Preencha uma data válida');
        return false;
      }
      return true;
    },
    'XX/XX'
  );
  const cvv = useForm(
    { name: 'cvv' },
    (value, setError) => {
      if (!/^\d{3}$/.test(value)) {
        setError('Preencha um CVV válido');
        return false;
      }
      return true;
    },
    'XXX'
  );
  const installment = useForm({ name: 'installment' });
  const cep = useForm(
    { name: 'cep' },
    (value, setError) => {
      if (!/^[0-9]{5}-\d{3}$/.test(value)) {
        setError('Digite a quantidade correta de dígitos');
        return false;
      }
      return true;
    },
    'XXXXX-XXX'
  );
  const number = useForm({ name: 'number' });
  const address = useForm({ name: 'address' });
  const neighborhood = useForm({ name: 'neighborhood' });
  const city = useForm({ name: 'city' });
  const state = useForm({ name: 'state' });

  React.useEffect(() => {
    if (plans.length && select !== undefined) {
      setPrice(plans.find((plan) => plan._id === select._id).price);
    }
  }, [plans, select]);

  function validFields() {
    const minimumData = [name, email, password, confirm_password, cpf];
    const addressFields = [cep, number, address, neighborhood, city, state];
    const paymentFields = {
      credit_card: [
        card_number,
        holder_name,
        card_validity,
        cvv,
        installment,
        ...addressFields,
      ],
      boleto: addressFields,
    };

    const fieldsToValidate = paymentFields[methodPayment] || [];
    const formData = [...minimumData, ...fieldsToValidate];

    const invalidFields = formData.filter((field) => !field.validate());

    if (invalidFields.length) {
      const firstField = invalidFields[0];
      firstField.scrollToFieldError();
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (validFields()) {
      const { url, options } = USER_POST({
        name: name.value,
        email: email.value,
        password: password.value,
        plan: select._id,
      });
      const { response } = await request(url, options);
      if (response.ok) userLogin(email.value, password.value);
    }
  }

  if (plans.length === 0 || select === undefined) return null;
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Subtitle>Dados Pessoais</Subtitle>
      <Input label="Nome completo *" type="text" name="name" {...name} />
      <Input label="Email *" type="email" name="email" {...email} />
      <Input label="Senha *" type="password" name="password" {...password} />
      <Input
        label="Confirme a Senha *"
        type="password"
        name="confirm_password"
        {...confirm_password}
      />
      <Input label="CPF *" type="text" name="cpf" max="14" {...cpf} />

      <Subtitle>Plano de assinatura</Subtitle>
      <Label label="Selecione um plano *" name="plans">
        <Select
          id="plans"
          options={plans}
          value={select.name}
          setValue={(id) => {
            const plan = plans.find((plan) => plan._id === id);
            setSelect(plan);
          }}
          fullWidth={true}
        />
      </Label>

      <div className={styles.total}>
        <h2>Total da compra:</h2>
        <span>{price ? `R$ ${price}` : ''}</span>
      </div>

      <Subtitle>Pagamento</Subtitle>
      <div className={methodPayment ? styles.spacingbottom : ''}>
        <Payments
          methodPayment={methodPayment}
          setMethodPayment={setMethodPayment}
          fields={{
            card_number,
            holder_name,
            card_validity,
            cvv,
            installment,
          }}
          selectedPlan={select._id}
          setAddressVisible={setAddressVisible}
        />
        {addressVisible && (
          <Address
            fields={{ cep, number, address, neighborhood, city, state }}
          />
        )}
      </div>

      {loading ? (
        <Button disabled className="marginTop">
          Finalizar Compra
        </Button>
      ) : (
        methodPayment && <Button className="marginTop">Finalizar Compra</Button>
      )}
      {error && <Error error={error} />}
    </form>
  );
};

export default FormCreate;
