import React from 'react';
import styles from './LoginMethodsPayment.module.css';
import LoginMethodsPaymentCreditCard from './LoginMethodsPaymentCreditCard';
import usePlans from '../../Hooks/usePlans';
import fixedNumber from '../Helper/fixedNumber';

const LoginMethodsPayment = ({ selectedPlan }) => {
  const [methodPayment, setMethodPayment] = React.useState('');

  const { getPlanPrice } = usePlans(selectedPlan);
  const planPrice = getPlanPrice(selectedPlan);

  return (
    <div className={styles.methodsPayment}>
      {/* Credit Card */}
      <div className={styles.divisorPayRadio}>
        <input
          type="radio"
          id="credit_card"
          name="payment_method"
          value="credit_card"
          checked={methodPayment === 'credit_card'}
          onChange={({ target }) => setMethodPayment(target.value)}
        />
        <label className={styles.label} htmlFor="credit_card">
          <strong>Cartão de Crédito</strong>
          <span>
            {planPrice && `até 12x de R$ ${fixedNumber(planPrice / 12)}`}
          </span>
        </label>
        <div className={styles.instructions}>
          <LoginMethodsPaymentCreditCard price={planPrice} />
        </div>
      </div>
      {/* PIX */}
      <div className={styles.divisorPayRadio}>
        <input
          type="radio"
          id="pix"
          name="payment_method"
          value="pix"
          checked={methodPayment === 'pix'}
          onChange={({ target }) => setMethodPayment(target.value)}
        />
        <label className={styles.label} htmlFor="pix">
          <strong>Pix (5% de desconto)</strong>
          <span>{planPrice && `R$ ${fixedNumber(planPrice * 0.95)}`}</span>
        </label>
        <div className={styles.instructions}>
          <p className={styles.instructionsText}>
            Ao clicar em FINALIZAR COMPRA você verá o código Copia/Cola e o QR
            Code.
          </p>
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
          onChange={({ target }) => setMethodPayment(target.value)}
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

export default LoginMethodsPayment;
