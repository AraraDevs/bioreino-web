import React from 'react';
import styles from './Courses.module.css';
import { COURSES_FILTERED_GET } from '../../../../../api';
import useFetch from '../../../../../Hooks/useFetch';
import Course from './Course';
import Error from '../../../../Helper/Error';

function getFilteredCourses(courses, filter) {
  if (courses) {
    return courses.filter((course) => {
      if (filter.plan === 'professional') {
        if (filter.category !== 'all') {
          return course.category === filter.category;
        }
        return true;
      } else {
        if (filter.category === 'all') {
          return course.plan === filter.plan;
        }
        return (
          course.plan === filter.plan && course.category === filter.category
        );
      }
    });
  }
}

const Courses = ({ user, filter }) => {
  const { data, request, loading, error } = useFetch();

  React.useEffect(() => {
    async function fetchCourses() {
      const { url, options } = COURSES_FILTERED_GET({ plan: user.plan });
      request(url, options);
    }
    fetchCourses();
  }, [user.plan, request]);

  const coursesFiltered = getFilteredCourses(data, filter) || [];

  if (loading) return <p>Carregando...</p>;
  if (error) return <Error error={error} />;
  return (
    <div className={styles.listCourses}>
      {coursesFiltered.map((course) => (
        <Course key={course._id} course={course} />
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
