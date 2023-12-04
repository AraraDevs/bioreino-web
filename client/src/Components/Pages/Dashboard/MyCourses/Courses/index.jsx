import React from 'react';
import styles from './Courses.module.css';
import { COURSES_FILTERED_GET } from '../../../../../api';
import useFetch from '../../../../../Hooks/useFetch';
import Course from './Course';
import Error from '../../../../Helper/Error';

function getFilteredCourses(courses, plan, category, categories) {
  if (category === null) {
    const planCategories = categories.filter((item) => item.plan === plan);
    return courses.filter((course) =>
      planCategories.find((item) => {
        return item.name === course.category;
      }),
    );
  }

  return courses.filter((course) => {
    const filterByPlan = category?.plan === plan;
    const filterByCategory = course?.category === category?.name;
    return filterByPlan && filterByCategory;
  });
}

const Courses = ({ user, plan, category, categories }) => {
  const { data, request, loading, error } = useFetch();

  React.useEffect(() => {
    async function fetchCourses() {
      const { url, options } = COURSES_FILTERED_GET({ plan: user.plan });
      request(url, options);
    }
    fetchCourses();
  }, [user.plan, request]);

  let coursesFiltered = [];
  if (data) {
    coursesFiltered = getFilteredCourses(data, plan, category, categories);
  }

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
