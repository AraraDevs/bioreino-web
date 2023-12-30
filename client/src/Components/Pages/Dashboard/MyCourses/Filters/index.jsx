import React from 'react';
import styles from './Filter.module.css';
import { ReactComponent as Arrow } from 'src/Assets/seta.svg';

import Plans from './Plans';
import Categories from './Categories';

const Filters = ({ plan, setPlan, user }) => {
  const ArrowElement = React.useMemo(() => <Arrow />, []);

  return (
    <div className={styles.filter}>
      <p>Filtrar por</p>
      <Plans selectedPlan={plan} setSelectedPlan={setPlan} user={user} />
      {ArrowElement}
      <Categories selectedPlan={plan} />
    </div>
  );
};

export default Filters;
