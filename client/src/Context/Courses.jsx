import React from 'react';
import { COURSES_GET } from '../api';
import useFetch from '../Hooks/useFetch';

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

  return { courses, loading };
}
