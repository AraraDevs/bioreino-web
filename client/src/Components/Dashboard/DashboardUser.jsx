import React from 'react';
import styles from './DashboardUser.module.css';
import { ReactComponent as Seta } from '../../Assets/seta.svg';

const DashboardUser = ({ user, logout }) => {
  const [menu, setMenu] = React.useState(false);

  return (
    <div
      onClick={() => setMenu(!menu)}
      className={`${styles.login} ${menu ? styles.loginMenu : ''}`}
    >
      <div className={styles.user}>
        <p className={styles.name}>{user.name}</p>
        <Seta className={styles.arrow} />
      </div>

      <ul className={styles.userOptions}>
        <li>
          <button onClick={logout}>Sair</button>
        </li>
      </ul>
    </div>
  );
};

export default DashboardUser;
