import React from 'react';
import styles from './MyCourses.module.css';
import Title from '../Title';
import Filters from './Filters';
import Courses from './Courses';
import { UserContext } from 'Context/User';
import { useCategoriesContext } from 'Context/Categories';

const MyCourses = () => {
  const { data } = React.useContext(UserContext);
  const { resetSelectedCategory } = useCategoriesContext();
  const [plan, setPlan] = React.useState(window.sessionStorage.getItem('planFilter') || data.plan);

  React.useEffect(() => {
    window.sessionStorage.setItem('planFilter', plan);
  }, [plan]);

  React.useEffect(() => {
    resetSelectedCategory();
  }, [plan, resetSelectedCategory]);

  return (
    <section className={`container ${styles.section}`}>
      <Title>Meus cursos</Title>
      <Filters plan={plan} setPlan={setPlan} user={data} />
      <Courses plan={plan} />
    </section>
  );
};

export default MyCourses;
