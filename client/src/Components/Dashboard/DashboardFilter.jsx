import React from 'react';
import styles from './DashboardFilter.module.css';
import { ReactComponent as Arrow } from '../../Assets/seta.svg';
import { ALL_CATEGORIES_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../Context/UserContext';

const DashboardFilter = ({ filter, setFilter }) => {
  const { data, request } = useFetch();
  const { data: userData } = React.useContext(UserContext);

  React.useEffect(() => {
    const { url, options } = ALL_CATEGORIES_GET();
    request(url, options);
  }, [request]);

  function handleFilter({ target }) {
    setFilter({ ...filter, category: target.value })
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.filterName}>Filtrar por</p>
      <div className={styles.filter}>
        <select
          value={filter.plan}
          onChange={({ target }) => {
            if (userData.plan === 'scholar' && target.value === 'professional')
              return;
            setFilter({ ...filter, plan: target.value });
          }}
        >
          <option value="scholar">Scholar</option>
          {userData.plan === 'professional' ? (
            <option value="professional">Professional</option>
          ) : (
            <option value="professional" disabled>
              Professional
            </option>
          )}
        </select>
        <Arrow />
        <select
          value={filter.category}
          onChange={handleFilter}
        >
          <option value="all">Todos</option>
          {data &&
            data.map((category) => (
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
