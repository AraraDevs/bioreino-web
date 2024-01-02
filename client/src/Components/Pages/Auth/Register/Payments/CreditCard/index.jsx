import Input from 'Components/Forms/Input';
import FieldSplit from 'Components/Layout/FieldSplit';
import currentFormat from 'Components/Helper/currencyFormat';
import Select from 'Components/Forms/Select';
import React from 'react';

function getInstallments(price) {
  const installments = [];

  for (let i = 1; i <= 12; i++) {
    const truncatedNumber = Math.floor((price / i) * 100) / 100;
    installments.push(`${i}x de ${currentFormat(truncatedNumber)}`);
  }

  return installments;
}

const CreditCard = ({ price, fields }) => {
  const [installments, setInstallments] = React.useState([]);

  React.useEffect(() => {
    const newInstallments = getInstallments(price);
    setInstallments(newInstallments);
  }, [price]);

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

export default CreditCard;
