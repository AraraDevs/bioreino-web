import styles from './Address.module.css';
import Subtitle from '../Subtitle';
import FieldSplit from 'Components/Layout/FieldSplit';
import Input from 'Components/Forms/Input';

const Address = ({ fields }) => {
  return (
    <div className={styles.address}>
      <Subtitle>Endereço</Subtitle>
      <FieldSplit>
        <Input label="CEP" name="cep" max="9" {...fields.cep} />
        <Input label="Número" name="number" {...fields.number} />
      </FieldSplit>
      <FieldSplit>
        <Input label="Endereço" name="address" {...fields.address} />
        <Input label="Bairro" name="neighborhood" {...fields.neighborhood} />
      </FieldSplit>
      <FieldSplit>
        <Input label="Cidade" name="city" {...fields.city} />
        <Input label="Estado" name="state" {...fields.state} />
      </FieldSplit>
    </div>
  );
};

export default Address;
