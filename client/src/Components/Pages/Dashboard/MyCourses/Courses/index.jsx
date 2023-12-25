import React from 'react';
import styles from './Courses.module.css';
import Item from './Item';
import { CoursesContext } from 'Context/Courses';
import useCategoriesContext from 'Hooks/useCategoriesContext';

const Courses = ({ plan }) => {
  const { courses, loading } = React.useContext(CoursesContext);
  const { selectedCategory } = useCategoriesContext();
  const [filter, setFilter] = React.useState([]);

  const filteredCourses = React.useCallback(
    (plan) => {
      if (!selectedCategory?.value) {
        return courses.filter((course) => course.category.plan === plan);
      }
      return courses.filter((course) => {
        const filterByPlan = selectedCategory?.plan === plan;
        const filterByCategory = course.category._id === selectedCategory?._id;
        return filterByPlan && filterByCategory;
      });
    },
    [courses, selectedCategory],
  );

  React.useEffect(() => {
    setFilter(filteredCourses(plan));
  }, [courses, plan, filteredCourses]);

  if (loading) return <p>Carregando...</p>;
  return (
    <div className={styles.listCourses}>
      {filter.map((course) => (
        <Item key={course._id} course={course} />
      ))}
      {filter.length === 0 && (
        <p className={styles.soon}>
          Em breve teremos aulas para esta categoria...
        </p>
      )}
    </div>
  );
};

export default Courses;
