import React from 'react';
import styles from './Subscribe.module.css';
import Card from './Card';
import { PlansContext } from 'Context/Plans';

const Subscribe = () => {
  const { plans } = React.useContext(PlansContext);

  return (
    <section id="inscreva" className={`container sectionSpacing`}>
      <h2 className="title">Inscreva-se</h2>
      <p className="subtitle">
        assine um plano e tenha acesso a todos os cursos do mesmo
      </p>

      <div className={styles.wrapper}>
        {plans.map((plan) => (
          <Card key={plan._id} {...plan} />
        ))}
      </div>
    </section>
  );
};

export default Subscribe;
