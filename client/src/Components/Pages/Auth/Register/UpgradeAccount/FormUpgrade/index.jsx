import React from 'react';
import { PlansContext } from 'Context/Plans';
import Label from 'Components/Forms/Label';
import Select from 'Components/Forms/Select';
import { useNavigate, useParams } from 'react-router-dom';
import Payments from '../../CreateAccount/FormCreate/Payments';
import useForm from 'Hooks/useForm';
import Address from '../../CreateAccount/FormCreate/Address';
import Subtitle from '../../Subtitle';
import useFetch from 'Hooks/useFetch';
import Button from 'Components/Forms/Button';
import Error from 'Components/Helper/Error';
import { UserContext } from 'Context/User';
import { USER_DATA_PATCH } from 'src/api';

const FormUpgrade = () => {
  const { plan_name } = useParams();
  const navigate = useNavigate();
  const { plans } = React.useContext(PlansContext);
  const { loading, error, request } = useFetch();
  const { data: user } = React.useContext(UserContext);
  const [select, setSelect] = React.useState(
    plans.find((plan) => plan.name === plan_name)
  );
  const [methodPayment, setMethodPayment] = React.useState('');
  const [addressVisible, setAddressVisible] = React.useState(false);

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

  function validFields() {
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
    const formData = [...fieldsToValidate];

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
      const token = localStorage.getItem('token');
      const { url, options } = USER_DATA_PATCH(token, user._id, {
        name: user.name,
        email: user.email,
        plan: select._id,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/dashboard');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Subtitle>Plano de assinatura</Subtitle>
      <Label label={`Plano ${select.name} selecionado!`} name="plans">
        <Select
          id="plans"
          options={[select]}
          value={select.name}
          setValue={(id) => {
            const plan = plans.find((plan) => plan._id === id);
            setSelect(plan);
          }}
          fullWidth={true}
        />
      </Label>
      <Subtitle>Pagamento</Subtitle>
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
        <Address fields={{ cep, number, address, neighborhood, city, state }} />
      )}
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

export default FormUpgrade;
