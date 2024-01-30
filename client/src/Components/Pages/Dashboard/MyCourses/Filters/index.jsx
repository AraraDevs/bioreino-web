import React from 'react';
import styles from './Filter.module.css';
import { ReactComponent as Arrow } from 'src/Assets/seta.svg';

import Plans from './Plans';
import Categories from './Categories';

const Filters = ({ selectedPlan, setSelectedPlan, user }) => {
  const ArrowElement = React.useMemo(() => <Arrow />, []);

  return (
    <div className={styles.filter}>
      <p>Filtrar por</p>
      <div className={styles.wrapper}>
        <Plans selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} user={user} />
        {ArrowElement}
        <Categories selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default Filters;
