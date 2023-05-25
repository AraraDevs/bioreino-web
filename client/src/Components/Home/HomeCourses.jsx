import React from 'react';
import styles from './HomeCourses.module.css';
import HomeCourse from './HomeCourse';

const HomeCourses = () => {
  return (
    <section id="cursos" className={`${styles.courses} sectionSpacing`}>
      <h2 className="title">Veja nossos Cursos!</h2>
      <p className="subtitle">conheça alguns de nossos cursos</p>

      <ul className={`${styles.coursesGrid} container`}>
        <HomeCourse />
      </ul>
    </section>
  );
};

export default HomeCourses;
