import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Sair } from '../../../../Assets/sair.svg';
import LogoBioreino from '../../../Layout/LogoBioreino';
import { UserContext } from '../../../../Context/UserContext';

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);
  return (
    <header className={`container ${styles.header}`}>
      <nav className={styles.nav}>
        <LogoBioreino />
        <div className={`${styles.login}`}>
          <p className={styles.name}>Olá, {data.name.split(' ')[0]}!</p>
          <button onClick={userLogout} className={styles.logout}>
            <Sair aria-label="Sair da conta" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
