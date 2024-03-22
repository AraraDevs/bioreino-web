import React from 'react';
import styles from './Courses.module.css';
import Item from './Item';
import { COURSES_GET } from 'src/api';
import useFetch from 'Hooks/useFetch';

const Courses = () => {
  const { data, request } = useFetch();

  React.useEffect(() => {
    function fetchCourses() {
      const { url, options } = COURSES_GET(3);
      request(url, options);
    }
    fetchCourses();
  }, [request]);

  return (
    <section id="cursos" className={`${styles.courses} sectionSpacing`}>
      <h2 className="title">Veja nossos Cursos!</h2>
      <p className="subtitle">conheça brevemente sobre eles</p>

      <ul className={`${styles.coursesGrid} container`}>
        {data &&
          data.map((course) => <Item key={course._id} course={course} />)}
      </ul>
    </section>
  );
};

export default Courses;
