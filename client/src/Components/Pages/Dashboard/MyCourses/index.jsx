import React from 'react';
import styles from './MyCourses.module.css';
import Title from '../Title';
import Filters from './Filters';
import Courses from './Courses';
import { UserContext } from '../../../../Context/User';
import { CATEGORIES_GET } from '../../../../api';

const MyCourses = () => {
  const { data } = React.useContext(UserContext);
  const [categories, setCategories] = React.useState([]);
  const [plan, setPlan] = React.useState(data.plan);
  const [category, setCategory] = React.useState(null);

  React.useEffect(() => {
    async function getCategories() {
      const token = localStorage.getItem('token');

      const { url, options } = CATEGORIES_GET(token);
      const responseCourses = await fetch(url, options);
      const json = await responseCourses.json();

      setCategories(json);
    }
    getCategories();
  }, []);

  React.useEffect(() => {
    setCategory(null);
  }, [plan, setCategory]);

  return (
    <section className={`container ${styles.section}`}>
      <Title>Meus cursos</Title>
      <Filters
        categories={categories}
        category={category}
        setCategory={setCategory}
        plan={plan}
        setPlan={setPlan}
        user={data}
      />
      <Courses
        user={data}
        plan={plan}
        category={category}
        categories={categories}
      />
    </section>
  );
};

export default MyCourses;
