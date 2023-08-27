import React from 'react';
import { COURSES_FILTERED_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import CourseItem from '../Course/CourseItem';
import Error from '../Helper/Error';
import styles from './DashboardCourses.module.css';

const DashboardCourses = ({ user, filter }) => {
  const { data, request, loading, error } = useFetch();
  const [coursesFiltered, setCoursesFiltered] = React.useState(null);

  React.useEffect(() => {
    async function fetchCourses() {
      const { url, options } = COURSES_FILTERED_GET({ plan: filter.plan });
      request(url, options);
    }
    if (!coursesFiltered) fetchCourses();
  }, [filter, request, coursesFiltered]);

  React.useEffect(() => {
    if (data) {
      const courses = data.filter((course) => {
        if (filter.plan === 'professional') {
          if (filter.category === 'all') {
            return true;
          } else {
            return course.category === filter.category;
          }
        } else {
          if (filter.category === 'all') {
            return course.plan === filter.plan;
          }
          return (
            course.plan === filter.plan && course.category === filter.category
          );
        }
      });
      setCoursesFiltered(courses);
    }
  }, [data, filter, user]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <Error error={error} />;
  if (!coursesFiltered) return null;
  return (
    <div className={styles.listCourses}>
      {coursesFiltered.map((course) => (
        <CourseItem key={course._id} course={course} />
      ))}
      {coursesFiltered.length === 0 && <p className={styles.soon}>Em breve teremos aulas para esta categoria...</p>}
    </div>
  );
};

export default DashboardCourses;
