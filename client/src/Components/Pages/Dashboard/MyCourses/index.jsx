import React from 'react';
import styles from './MyCourses.module.css';
import Title from '../Title';
import Filters from './Filters';
import Courses from './Courses';
import { UserContext } from '../../../../Context/UserContext';

const MyCourses = () => {
  const { data } = React.useContext(UserContext);
  const [filter, setFilter] = React.useState({
    plan: data.plan,
    category: 'all',
  });

  return (
    <section className={`container ${styles.section}`}>
      <Title>Meus cursos</Title>
      <Filters filter={filter} setFilter={setFilter} user={data} />
      <Courses user={data} filter={filter} />
    </section>
  );
};

export default MyCourses;
