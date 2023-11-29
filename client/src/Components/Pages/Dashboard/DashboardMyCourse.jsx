import React from 'react';
import styles from './DashboardMyCourse.module.css';
import DashboardTitle from './DashboardTitle';
import DashboardFilter from './DashboardFilter';
import DashboardCourses from './DashboardCourses';
import { UserContext } from '../../Context/UserContext';

const DashboardMyCourses = () => {
  const { data } = React.useContext(UserContext);
  const [filter, setFilter] = React.useState({
    plan: data.plan,
    category: 'all',
  });

  return (
    <section className={`container ${styles.section}`}>
      <DashboardTitle>Meus cursos</DashboardTitle>
      <DashboardFilter filter={filter} setFilter={setFilter} />
      <DashboardCourses user={data} filter={filter} />
    </section>
  );
};

export default DashboardMyCourses;
