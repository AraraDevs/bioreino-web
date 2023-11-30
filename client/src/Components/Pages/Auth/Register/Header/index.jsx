import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import LogoBioreino from '../../../../Layout/LogoBioreino';

const Header = () => {
  return (
    <header className={`${styles.header} container`}>
      <LogoBioreino />
      <Link to="/login" className={styles.login}>
        Entrar
      </Link>
    </header>
  );
};

export default Header;
