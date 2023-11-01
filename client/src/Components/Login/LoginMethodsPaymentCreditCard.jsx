import React from 'react';
import Input from '../Forms/Input';
import FieldSplit from '../Layout/FieldSplit';
import fixedNumber from '../Helper/fixedNumber';
import Select from '../Forms/Select';

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

const LoginMethodsPaymentCreditCard = ({ price, fields }) => {
  const installments = setInstallments(price);

  return (
    <>
      <Input
        label="Número do cartão *"
        name="card_number"
        {...fields}
        value={fields.values.card_number}
      />
      <FieldSplit>
        <Input
          label="Nome do portador *"
          name="holder_name"
          {...fields}
          value={fields.values.holder_name}
        />
        <Input
          label="Validade (mm/aa) *"
          name="card_validity"
          {...fields}
          value={fields.values.card_validity}
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Código de segurança *"
          name="cvv"
          {...fields}
          value={fields.values.cvv}
        />
        <div>
          <Select
            label="Parcelas"
            name="installments"
            options={installments}
            {...fields}
            value={fields.values.installments}
          />
        </div>
      </FieldSplit>
    </>
  );
};

export default LoginMethodsPaymentCreditCard;
