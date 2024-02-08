import React from 'react';
import Title from '../Title';
import Head from 'Components/Helper/Head';
import FormCreate from './FormCreate';

const CreateAccount = () => {
  return (
    <>
      <Head
        title="Assine"
        description="Assine um de nossos planos para ter acesso aos cursos que oferecemos sobre biologia"
      />
      <Title>Assine e tenha acesso aos cursos do plano selecionado</Title>
      <FormCreate />
    </>
  );
};

export default CreateAccount;
