import React from 'react';
import styles from './Filter.module.css';
import { ReactComponent as Arrow } from 'src/Assets/seta.svg';

import Plans from './Plans';
import Categories from './Categories';

const Filters = ({ selectedPlan, setSelectedPlan }) => {
  const ArrowElement = React.useMemo(() => <Arrow />, []);

  return (
    <div className={styles.filter}>
      <p>Filtrar por</p>
      <div className={styles.wrapper}>
        <Plans selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
        {ArrowElement}
        <Categories selectedPlan={selectedPlan} />
      </div>
    </div>
  );
};

export default Filters;
