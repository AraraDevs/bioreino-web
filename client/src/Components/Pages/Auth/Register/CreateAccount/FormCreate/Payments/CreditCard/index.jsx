import Input from 'Components/Forms/Input';
import FieldSplit from 'Components/Layout/FieldSplit';
import currencyFormat from 'Components/Helper/currencyFormat';
import Select from 'Components/Forms/Select';
import React from 'react';
import Label from 'Components/Forms/Label';

function getInstallments(price) {
  const installments = [];

  for (let i = 1; i <= 12; i++) {
    const truncatedNumber = Math.floor((price / i) * 100) / 100;
    installments.push(`${i}x de ${currencyFormat(truncatedNumber)}`);
  }

  return installments;
}

const CreditCard = ({ price, fields }) => {
  const [installments, setInstallments] = React.useState([]);

  React.useEffect(() => {
    const newInstallments = getInstallments(price);
    setInstallments(newInstallments);
  }, [price]);

  React.useEffect(() => {
    if (
      installments.length &&
      !installments.includes(fields.installment.value)
    ) {
      fields.installment.setValue(installments[0]);
    }
  }, [installments, fields.installment]);

  function setValidity(e) {
    const input = fields.card_validity;

    input.onChange(e);
    const value = e.target.value;

    function isValidMonth() {
      const firstNumberOfTheMonth = Number(value.charAt(0));
      const firstTwoNumbersOfTheMonth = Number(value.slice(0, 2));
      if (firstNumberOfTheMonth > 1) {
        input.setValue('0' + firstNumberOfTheMonth);
      } else if (firstTwoNumbersOfTheMonth > 12) {
        input.setValue('12');
      }
    }
    isValidMonth();
  }

  return (
    <>
      <Input
        label="Número do cartão *"
        name="card_number"
        max="19"
        {...fields.card_number}
      />
      <FieldSplit>
        <Input
          label="Nome do portador *"
          name="holder_name"
          {...fields.holder_name}
        />
        <Input
          label="Validade (mm/aa) *"
          name="card_validity"
          {...fields.card_validity}
          onChange={setValidity}
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Código de segurança *"
          name="cvv"
          max="3"
          {...fields.cvv}
        />
        <div>
          <Label label="Parcelas (12x sem juros)" name="installments">
            <Select
              id="installments"
              options={installments}
              value={fields.installment.value}
              setValue={(value) => fields.installment.setValue(value)}
              fullWidth={true}
            />
          </Label>
        </div>
      </FieldSplit>
    </>
  );
};

export default CreditCard;
