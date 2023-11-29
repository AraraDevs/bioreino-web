import React from 'react';
import styles from './DashboardFilter.module.css';
import { ReactComponent as Arrow } from '../../Assets/seta.svg';
import { CATEGORIES_GET } from '../../api';
import { UserContext } from '../../Context/UserContext';

import DashboardFilterPlan from './Filters/DashboardFilterPlan';
import DashboardFilterCategories from './Filters/DashboardFilterCategories';

const getFilteredCategories = (filter) => (category) => {
  if (filter.plan === 'scholar') {
    return category.plan === 'scholar';
  }
  return true;
};

const DashboardFilter = ({ filter, setFilter }) => {
  const [categories, setCategories] = React.useState([]);
  const { data } = React.useContext(UserContext);

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

  const filteredCategories = categories.filter(getFilteredCategories(filter));

  React.useEffect(() => {
    // checks if the plan contains the selected category
    if (
      filter.plan === 'scholar' &&
      filter.category !== 'all' &&
      !containsCategory()
    ) {
      setFilter({ ...filter, category: 'all' });
    }

    function containsCategory() {
      const index = filteredCategories.findIndex(
        (category) => category.name === filter.category,
      );
      return index === -1 ? false : true;
    }
  }, [filter, setFilter, filteredCategories]);

  function handleFilter({ target }) {
    if (target.name === 'plans') {
      if (data.plan === 'scholar' && target.value === 'professional') return;
      setFilter({ ...filter, plan: target.value });
    } else {
      setFilter({ ...filter, category: target.value });
    }
  }

  return (
    <div className={styles.filter}>
      <p>Filtrar por</p>
      <DashboardFilterPlan
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
        user={data}
      />
      <Arrow />
      <DashboardFilterCategories
        filter={filter}
        categories={filteredCategories}
        handleFilter={handleFilter}
      />
    </div>
  );
};

export default DashboardFilter;
