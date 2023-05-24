import React from 'react';
import LogoBioreino from '../LogoBioreino';
import styles from './DashboardHeader.module.css';
import DashboardUser from './DashboardUser';

const DashboardHeader = ({ data, userLogout }) => {
  return (
    <header className={`container ${styles.header}`}>
      <nav className={styles.nav}>
        <LogoBioreino />
        <DashboardUser user={data} logout={userLogout} />
      </nav>
    </header>
  );
};

export default DashboardHeader;
