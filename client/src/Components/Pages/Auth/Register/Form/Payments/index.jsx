import React from 'react';
import styles from './Payments.module.css';
import CreditCard from './CreditCard';
import currencyFormat from 'Components/Helper/currencyFormat';
import { PlansContext } from 'Context/Plans';

const Payments = ({
  methodPayment,
  setMethodPayment,
  fields,
  selectedPlan,
  setAddressVisible,
}) => {
  const { plans } = React.useContext(PlansContext);
  const plan = plans.find((plan) => plan._id === selectedPlan);
  const price = plan.price.replace(',', '.');

  function handlePaymentChange({ target }) {
    setMethodPayment(target.value);

    if (target.value === 'credit_card' || target.value === 'boleto') {
      setAddressVisible(true);
    } else {
      setAddressVisible(false);
    }
  }

  return (
    <div className={styles.methodsPayment}>
      {/* PIX */}
      <div className={styles.divisorPayRadio}>
        <input
          type="radio"
          id="pix"
          name="payment_method"
          value="pix"
          checked={methodPayment === 'pix'}
          onChange={handlePaymentChange}
        />
        <label className={styles.label} htmlFor="pix">
          <strong>Pix (5% de desconto)</strong>
          {selectedPlan && (
            <span>
              <span className={styles.discount}>{currencyFormat(price)}</span>
              {currencyFormat(price * 0.95)}
            </span>
          )}
        </label>
        <div className={styles.instructions}>
          <p className={styles.instructionsText}>
            Desconto de 5% aplicado. Ao clicar em FINALIZAR COMPRA você verá o
            código Copia/Cola e o QR Code.
          </p>
        </div>
      </div>
      {/* Credit Card */}
      <div className={styles.divisorPayRadio}>
        <input
          type="radio"
          id="credit_card"
          name="payment_method"
          value="credit_card"
          checked={methodPayment === 'credit_card'}
          onChange={handlePaymentChange}
        />
        <label className={styles.label} htmlFor="credit_card">
          <strong>Cartão de Crédito</strong>
          {selectedPlan && <span>até 12x de {currencyFormat(price / 12)}</span>}
        </label>
        <div className={styles.instructions}>
          {methodPayment === 'credit_card' && (
            <CreditCard price={price} fields={fields} />
          )}
        </div>
      </div>
      {/* Boleto Bancário */}
      <div className={styles.divisorPayRadio}>
        <input
          type="radio"
          id="boleto"
          name="payment_method"
          value="boleto"
          checked={methodPayment === 'boleto'}
          onChange={handlePaymentChange}
        />
        <label className={styles.label} htmlFor="boleto">
          <strong>Boleto Bancário</strong>
        </label>
        <div className={styles.instructions}>
          <p className={styles.instructionsText}>
            Ao clicar em FINALIZAR COMPRA você terá acesso ao boleto.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payments;
