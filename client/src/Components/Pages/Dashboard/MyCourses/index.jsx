import React from 'react';
import styles from './MyCourses.module.css';
import Title from '../Title';
import Filters from './Filters';
import Courses from './Courses';
import { UserContext } from 'Context/User';
import useCategoriesContext from 'Hooks/useCategoriesContext';

const MyCourses = () => {
  const { data: user } = React.useContext(UserContext);
  const { resetSelectedCategory } = useCategoriesContext();
  const [plan, setPlan] = React.useState(() => {
    const plan = 'professional';
    const sessionStoragePlan = window.sessionStorage.getItem('planFilter');

    if (user.plan !== plan && sessionStoragePlan === plan) {
      return user.plan;
    }
    return window.sessionStorage.getItem('planFilter') || user.plan;
  });

  React.useEffect(() => {
    window.sessionStorage.setItem('planFilter', plan);
  }, [plan]);

  React.useEffect(() => {
    resetSelectedCategory();
  }, [plan, resetSelectedCategory]);

  return (
    <section className={`container ${styles.section}`}>
      <Title>Meus cursos</Title>
      <Filters plan={plan} setPlan={setPlan} user={user} />
      <Courses plan={plan} />
    </section>
  );
};

export default MyCourses;
