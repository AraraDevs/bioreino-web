import React from 'react';
import styles from './Course.module.css';
import Image from '../../Assets/dinossauros.jpg';

const Course = () => {
  function handleClick(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('href');
    const section = document.querySelector(id);
    const header = document.querySelector('header');

    const top = section.offsetTop - header.offsetHeight;

    window.scroll({ top, behavior: 'smooth' });
  }

  return (
    <>
      <li className={styles.coursesItem}>
        <a href="#sobre" onClick={handleClick}>
          <span className={styles.plan}>Professional</span>
          <div
            className={styles.bg}
            style={{ backgroundImage: `url(${Image})` }}
          ></div>
          <div className={styles.description}>
            <h3 className={styles.title}>Os dinossauros</h3>
            <span className={styles.teacher}>Prof. Isaak Valentin</span>
            <p className={styles.about}>
              Aprenda sobre os diversos dinossauros que habitavam nosso mundo!
            </p>
          </div>
        </a>
      </li>
    </>
  );
};

export default Course;
