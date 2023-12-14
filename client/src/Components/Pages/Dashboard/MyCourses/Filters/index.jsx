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
      <Plans plan={plan} setPlan={setPlan} user={user} />
      {ArrowElement}
      <Categories plan={plan} />
    </div>
  );
};

export default Filters;
