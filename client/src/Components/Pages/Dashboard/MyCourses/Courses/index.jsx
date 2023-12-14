import React from 'react';
import styles from './Courses.module.css';
import Item from './Item';
import { useCoursesContext } from '../../../../../Context/Courses';

const Courses = ({ plan }) => {
  const { courses, filteredCourses, loading } = useCoursesContext();

  const coursesFiltered = courses ? filteredCourses(plan) : [];

  if (loading) return <p>Carregando...</p>;
  return (
    <div className={styles.listCourses}>
      {coursesFiltered.map((course) => (
        <Item key={course._id} course={course} />
      ))}
      {coursesFiltered.length === 0 && (
        <p className={styles.soon}>
          Em breve teremos aulas para esta categoria...
        </p>
      )}
    </div>
  );
};

export default Courses;
