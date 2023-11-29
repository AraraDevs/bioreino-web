import React from 'react';
import styles from './DashboardLastCourse.module.css';
import {ReactComponent as Leopard} from '../../Assets/leopardo.svg';
import CourseLast from '../Course/CourseLast';
import DashboardTitle from './DashboardTitle';

const DashboardLastCourse = () => {
  return (
    <section className="container">
      <DashboardTitle>Último curso</DashboardTitle>
      <div className={styles.container_lastcourse}>
        <Leopard className={styles.leopard} />
        <CourseLast />
      </div>
    </section>
  );
};

export default DashboardLastCourse;
