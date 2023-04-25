import React from 'react';
import styles from './Course.module.css';
import Image from '../../Assets/dinossauros.jpg';

const Course = () => {
  return (
    <>
      <li className={styles.coursesItem}>
        <a href="#sobre">
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
