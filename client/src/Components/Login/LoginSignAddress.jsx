import React from 'react';
import FieldSplit from '../Layout/FieldSplit';
import Input from '../Forms/Input';

const LoginSignAddress = ({ fields }) => {
  return (
    <div>
      <h2>Endereço</h2>
      <FieldSplit>
        <Input label="CEP" name="cep" {...fields} value={fields.values.cep} />
        <Input
          label="Número"
          name="number"
          {...fields}
          value={fields.values.number}
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Endereço"
          name="address"
          {...fields}
          value={fields.values.address}
        />
        <Input
          label="Bairro"
          name="neighborhood"
          {...fields}
          value={fields.values.neighborhood}
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Cidade"
          name="city"
          {...fields}
          value={fields.values.city}
        />
        <Input
          label="Estado"
          name="state"
          {...fields}
          value={fields.values.state}
        />
      </FieldSplit>
    </div>
  );
};

export default LoginSignAddress;
