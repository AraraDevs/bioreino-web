import React from 'react';
import styleSelect from '../Forms/Select.module.css';
import Input from '../Forms/Input';
import FieldSplit from '../Layout/FieldSplit';
import useForm from '../../Hooks/useForm';
import fixedNumber from '../Helper/fixedNumber';

const LoginMethodsPaymentCreditCard = ({ price }) => {
  const [installment, setInstallment] = React.useState('');

  const holderName = useForm();
  const cardNumber = useForm('numCard', { canFormat: true, regex: /\D/g });
  const cardValidity = useForm('validity', { canFormat: true });
  const cvv = useForm('cvv', { canFormat: true, regex: /\D/g });

  const installments = setInstallments(price);

  return (
    <>
      <p>
        {price
          ? `Total: R$ ${price}`
          : 'Selecione um plano acima para ter acesso a seu preço!'}
      </p>
      <Input label="Número do cartão *" name="card_number" {...cardNumber} />
      <FieldSplit>
        <Input label="Nome do portador *" name="holder_name" {...holderName} />
        <Input label="Validade *" name="card_validity" {...cardValidity} />
      </FieldSplit>
      <FieldSplit>
        <Input label="Código de segurança *" name="cvv" {...cvv} />
        <div>
          <label htmlFor="installments" className={styleSelect.label}>
            Parcelas
          </label>
          <select
            name="installments"
            id="installments"
            value={installment}
            onChange={({ target }) => setInstallment(target.value)}
            className={styleSelect.select}
          >
            <option value="" disabled>
              Selecione
            </option>
            {installments.map((installment) => (
              <option key={installment}>{installment}</option>
            ))}

            {/* Negócio aqui é fazer retornar uma array contendo todas as parcelas do plano escolhido. Pra isso pode criar uma função dentro do hook usePlans. Em seguida, poderá modificar o componente Select para receber apenas uma array pura dentro da prop 'options', pois lá ela está recebendo um array de objetos, o que não é bacana para um componente próprio pra isso, pois está sendo usado apenas nos dados finais no formulário */}
          </select>
        </div>
      </FieldSplit>
    </>
  );
};

export default LoginMethodsPaymentCreditCard;

function setInstallments(price) {
  const installments = [];
  if (price) {
    for (let i = 1; i <= 12; i++) {
      const truncatedNumber = Math.floor((price / i) * 100) / 100;
      installments.push(`${i}x de R$ ${fixedNumber(truncatedNumber)}`);
    }

    return installments;
  }
  return [];
}
