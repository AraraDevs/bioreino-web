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
  const [selectedPlan, setSelectedPlan] = React.useState(
    window.sessionStorage.getItem('planFilter') || user.plan,
  );

  React.useEffect(() => {
    window.sessionStorage.setItem('planFilter', selectedPlan);
  }, [selectedPlan]);

  React.useEffect(() => {
    resetSelectedCategory();
  }, [selectedPlan, resetSelectedCategory]);

  return (
    <section className={`container ${styles.section}`}>
      <Title>Meus cursos</Title>
      <Filters selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
      <Courses selectedPlan={selectedPlan} />
    </section>
  );
};

export default MyCourses;
