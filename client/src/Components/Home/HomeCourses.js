import React from 'react';
import styles from './HomeCourses.module.css';
import Course from '../Courses/Course';

const HomeCourses = () => {
  return (
    <section id="cursos" className={`${styles.courses} sectionSpacing`}>
      <h2 className="title">Veja nossos Cursos!</h2>
      <p className="subtitle">conheça alguns de nossos cursos</p>

      <ul className={`${styles.coursesGrid} container`}>
        <Course />
        <Course />
        <Course />
      </ul>
    </section>
  );
};

export default HomeCourses;
