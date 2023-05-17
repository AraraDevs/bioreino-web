import React from 'react';
import styles from './HeaderLoginSign.module.css';
import useMedia from '../../Hooks/useMedia';
import { Link } from 'react-router-dom';
import LogoBioreino from '../LogoBioreino';

const HeaderLoginSign = () => {
  const media = useMedia('(max-width: 1440px)');

  return (
    <header
      className={`${styles.header} ${media ? 'container' : styles.container}`}
    >
      <LogoBioreino />
      <Link to="/login" className={styles.login}>
        Entrar
      </Link>
    </header>
  );
};

export default HeaderLoginSign;
