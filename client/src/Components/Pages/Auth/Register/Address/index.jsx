import styles from './Address.module.css';
import Subtitle from '../Subtitle';
import FieldSplit from 'Components/Layout/FieldSplit';
import Input from 'Components/Forms/Input';

const Address = ({ fields }) => {
  return (
    <div className={styles.address}>
      <Subtitle>Endereço</Subtitle>
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

export default Address;
