import React from 'react';
import styles from './Header.module.css';
import Navigation from './Navigation';

const Header = () => {
  const [fixed, setFixed] = React.useState(null);

  React.useEffect(() => {
    function changeHeader() {
      if (window.scrollY > 0) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    }
    changeHeader();

    window.addEventListener('scroll', changeHeader);
    return () => window.removeEventListener('scroll', changeHeader);
  }, []);

  return (
    <header className={`${styles.header} ${fixed ? styles.fixed : ''}`}>
      <Navigation />
    </header>
  );
};

export default Header;
