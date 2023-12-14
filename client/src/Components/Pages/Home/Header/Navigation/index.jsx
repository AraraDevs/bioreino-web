import React from 'react';
import styles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import LogoBioreino from 'Components/Layout/LogoBioreino';
import Item from '../Item';

const sections = [
  { link: 'cursos', text: 'cursos' },
  { link: 'sobre', text: 'Sobre os planos' },
  { link: 'depoimentos', text: 'depoimentos' },
];

const Navigation = () => {
  const [onAction, setOnAction] = React.useState(false);

  function getDistanceFromTheTop(element) {
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
  }

  function activeClassElement(element) {
    const header = document.querySelector('header');
    const linkActive = header.querySelector('a.active');
    if (linkActive) linkActive.classList.remove('active');
    element.classList.add('active');
    element.blur();
  }

  function scrollToSection(event) {
    event.preventDefault();

    const link = event.target;
    const header = document.querySelector('header');
    const heightHeader = header.offsetHeight;
    const top = getDistanceFromTheTop(link) - heightHeader;

    window.scroll({ top, behavior: 'smooth' });

    setOnAction(true);
    activeClassElement(link);
  }

  return (
    <nav className={`container ${styles.nav}`}>
      <LogoBioreino />

      <ul className={styles.index} data-indexes>
        {sections.map(({ link, text }) => (
          <Item
            key={link}
            link={link}
            text={text}
            scroll={scrollToSection}
            onAction={onAction}
            setOnAction={setOnAction}
          />
        ))}
      </ul>

      <ul className={styles.menu}>
        <li>
          <Link to="/login" className={styles.login}>
            Entrar
          </Link>
        </li>
        <li>
          <a onClick={scrollToSection} href="#inscreva" className={styles.sign}>
            Assinar
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
