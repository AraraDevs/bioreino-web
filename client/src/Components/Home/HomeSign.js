import React from 'react';
import styles from './HomeSign.module.css';
import HomeCard from './HomeCard';

const HomeSign = () => {
  return (
    <section id='inscreva' className={`container sectionSpacing`}>
      <h2 className="title">Inscreva-se</h2>
      <p className="subtitle">
        assine um plano e tenha acesso a todos os cursos do mesmo
      </p>

      <div className={styles.wrapper}>
        <HomeCard
          title="scholar"
          benefits={[
            'Acesso aos cursos para estudantes do ensino fundamental e médio',
            'Preparo para vestibular',
            '12 meses de acesso ilimitado',
          ]}
          price="600,00"
        />
        <HomeCard
          title="professional"
          benefits={[
            'Acesso aos cursos para estudantes do ensino fundamental e médio',
            'Cursos voltados para mercado de trabalho',
            '12 meses de acesso ilimitado',
            'Certificado de conclusão',
          ]}
          price="1200,00"
        />
      </div>
    </section>
  );
};

export default HomeSign;
