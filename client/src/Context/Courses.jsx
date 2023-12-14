import React from 'react';

import { COURSES_GET } from '../api';

import useFetch from '../Hooks/useFetch';
import { useCategoriesContext } from './Categories';

const CoursesContext = React.createContext();
CoursesContext.displayName = 'Courses';

export default function CoursesProvider({ children }) {
  const [courses, setCourses] = React.useState([]);
  const { request, loading } = useFetch();

  React.useEffect(() => {
    async function fetchCourses() {
      const { url, options } = COURSES_GET();
      const { json } = await request(url, options);
      setCourses(json);
    }
    fetchCourses();
  }, [request, setCourses]);

  return (
    <CoursesContext.Provider value={{ courses, setCourses, loading }}>
      {children}
    </CoursesContext.Provider>
  );
}

export function useCoursesContext() {
  const { courses, loading } = React.useContext(CoursesContext);

  const { categories, selectedCategory } = useCategoriesContext();

  function filteredCourses(plan) {
    if (selectedCategory === null) {
      const planCategories = categories.filter((item) => item.plan === plan);
      return courses.filter((course) =>
        planCategories.find((item) => {
          return item._id === course.category;
        }),
      );
    }
    return courses.filter((course) => {
      const filterByPlan = selectedCategory?.plan === plan;
      const filterByCategory = course?.category === selectedCategory?._id;
      return filterByPlan && filterByCategory;
    });
  }

  return { courses, loading, filteredCourses };
}
