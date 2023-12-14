import React from 'react';
import LastCourse from './LastCourse';
import MyCourses from './MyCourses';
import Head from 'Components/Helper/Head';
import Header from './Header';

const Dashboard = () => {
  return (
    <>
      <Head
        title="Dashboard"
        description="Área do aluno para poder desfrutar dos cursos disponíveis para seu plano contratado"
      />
      <Header />
      <LastCourse />
      <MyCourses />
    </>
  );
};

export default Dashboard;
