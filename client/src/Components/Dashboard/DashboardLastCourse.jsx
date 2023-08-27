import React from 'react';
import styles from './DashboardLastCourse.module.css';
import { ReactComponent as Leopardo } from '../../Assets/leopardo.svg';
import CourseLast from '../Course/CourseLast';
import DashboardTitle from './DashboardTitle';

const DashboardLastCourse = () => {
  return (
    <section className={`container ${styles.lastCourse}`}>
      <DashboardTitle>Último curso</DashboardTitle>
      <div className={styles.wrapper}>
        <Leopardo className={styles.leopard} />
        <CourseLast />
      </div>
    </section>
  );
};

export default DashboardLastCourse;
