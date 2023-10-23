import React from 'react';
import styles from './LoginMethodsPayment.module.css';
import LoginMethodsPaymentCreditCard from './LoginMethodsPaymentCreditCard';

const LoginMethodsPayment = ({ selectedPlan }) => {
  const [methodPayment, setMethodPayment] = React.useState('');

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
          <span>até 12x de R$ ...</span>
        </label>
        <div className={styles.instructions}>
          <LoginMethodsPaymentCreditCard selectedPlan={selectedPlan} />
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
          <strong>Pix</strong>
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
