import React from 'react';
import styles from './DashboardFilter.module.css';
import { ReactComponent as Arrow } from '../../Assets/seta.svg';
import { CATEGORIES_GET } from '../../api';
import { UserContext } from '../../Context/UserContext';

const DashboardFilter = ({ filter, setFilter }) => {
  const [courses, setCourses] = React.useState([]);
  const { data } = React.useContext(UserContext);

  React.useEffect(() => {
    async function getCategories() {
      const token = localStorage.getItem('token');

      const { url, options } = CATEGORIES_GET(token);

      const responseCourses = await fetch(url, options);
      const json = await responseCourses.json();

      setCourses(json);
    }
    getCategories();
  }, []);

  function handleFilter({ target }) {
    setFilter({ ...filter, category: target.value });
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.filterName}>Filtrar por</p>
      <div className={styles.filter}>
        <select
          value={filter.plan}
          onChange={({ target }) => {
            if (data.plan === 'scholar' && target.value === 'professional')
              return;
            setFilter({ ...filter, plan: target.value });
          }}
        >
          <option value="scholar">Scholar</option>
          {data.plan === 'professional' ? (
            <option value="professional">Professional</option>
          ) : (
            <option value="professional" disabled>
              Professional
            </option>
          )}
        </select>
        <Arrow />
        <select value={filter.category} onChange={handleFilter}>
          <option value="all">Todos</option>
          {courses.length > 0 &&
            courses.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default DashboardFilter;
