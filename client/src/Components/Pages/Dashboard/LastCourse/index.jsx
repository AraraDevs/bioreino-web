import React from 'react';
import styles from './LastCourse.module.css';
import { ReactComponent as Leopard } from '../../../../Assets/leopardo.svg';
import Course from './Course';
import Title from '../Title';

const LastCourse = () => {
  return (
    <section className="container">
      <Title>Último curso</Title>
      <div className={styles.container_lastcourse}>
        <Leopard className={styles.leopard} />
        <Course />
      </div>
    </section>
  );
};

export default LastCourse;
