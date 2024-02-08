import Head from 'Components/Helper/Head';
import React from 'react';
import Title from '../Title';
import FormUpgrade from './FormUpgrade';

const UpgradeAccount = () => {
  return (
    <>
      <Head
        title="Atualize o plano de assinatura"
        description="Faça o upgrade de seu plano de assinatura para obter acesso a cursos mais avançados!"
      />
      <Title>
        Atualize seu plano de assinatura e tenha acesso a cursos mais avançados
      </Title>
      <FormUpgrade />
    </>
  );
};

export default UpgradeAccount;
