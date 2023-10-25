import React from 'react';
import Input from '../Forms/Input';
import FieldSplit from '../Layout/FieldSplit';
import useForm from '../../Hooks/useForm';
import fixedNumber from '../Helper/fixedNumber';
import Select from '../Forms/Select';

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
          <Select
            label="Parcelas"
            name="installments"
            options={installments}
            value={installment}
            onChange={({ target }) => setInstallment(target.value)}
          />
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
      installments.push(
        `${i}x de R$ ${fixedNumber(truncatedNumber).replace('.', ',')}`,
      );
    }

    return installments;
  }
  return [];
}
