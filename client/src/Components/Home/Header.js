import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useMedia from '../../Hooks/useMedia';
import LogoBioreino from '../LogoBioreino';
import HomeIndex from './HomeIndex';

const Header = () => {
  const media = useMedia('(max-width: 1440px)');
  const [fixed, setFixed] = React.useState(null);
  const header = React.useRef();

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

  function getDistanceFromTheTop(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
  }

  function activeClassElement(element) {
    const linkActive = document.querySelector(`header a.active`);
    if (linkActive) linkActive.classList.remove('active');
    element.classList.add('active');
    element.blur();
  }

  function scrollToSection(event) {
    event.preventDefault();

    const link = event.target;
    const heightHeader = header.current.offsetHeight;
    const top = getDistanceFromTheTop(link) - heightHeader;

    window.scroll({ top, behavior: 'smooth' });

    activeClassElement(link);
  }

  return (
    <header
      ref={header}
      className={`${styles.header} ${fixed && styles.fixed}`}
    >
      <nav
        className={`${styles.nav} ${media ? 'container' : styles.container}`}
      >
        <LogoBioreino />

        <HomeIndex
          scroll={scrollToSection}
          items={[
            { link: 'cursos', text: 'cursos' },
            { link: 'sobre', text: 'Sobre os planos' },
            { link: 'depoimentos', text: 'depoimentos' },
          ]}
        />

        <ul className={styles.menu}>
          <li>
            <Link to="/login" className={styles.login}>
              Entrar
            </Link>
          </li>
          <li>
            <a
              onClick={scrollToSection}
              href="#inscreva"
              className={styles.sign}
            >
              Assinar
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
