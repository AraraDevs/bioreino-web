import React from 'react';
import styles from './Courses.module.css';
import Item from './Item';
import { CoursesContext } from 'Context/Courses';
import useCategoriesContext from 'Hooks/useCategoriesContext';

const Courses = ({ selectedPlan }) => {
  const { courses, loading } = React.useContext(CoursesContext);
  const { selectedCategory } = useCategoriesContext();
  const [filter, setFilter] = React.useState([]);

  React.useEffect(() => {
    function filterCourses(plan) {
      return courses.filter((course) => {
        if (!selectedCategory.value) return course.category.plan === plan;

        const filterByPlan = selectedCategory.plan === plan;
        const filterByCategory = course.category._id === selectedCategory._id;
        return filterByPlan && filterByCategory;
      });
    }

    setFilter(filterCourses(selectedPlan));
  }, [courses, selectedPlan, selectedCategory]);

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
