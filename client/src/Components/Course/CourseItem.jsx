import React from 'react';
import styles from './CourseItem.module.css';
import { Link } from 'react-router-dom';
import formatUrl from '../Helper/formatUrl';
import { LESSONS_OF_COURSE_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';

const CourseItem = ({ course, user }) => {
  const [progress, setProgress] = React.useState(0);
  const { data, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = LESSONS_OF_COURSE_GET(course.title);
    request(url, options);
  }, [course.title, request]);

  function percentageOfLessonsCompleted() {
    const totalOfLessonsInTheCourse = data.length;
    const courseVisited = user.coursesProgress
      ? user.coursesProgress[course.title]
      : null;

    if (courseVisited) {
      const totalOfLessonsViewed = courseVisited.length;
      setProgress((totalOfLessonsViewed / totalOfLessonsInTheCourse) * 100);
    }
  }
  if (data && !progress) percentageOfLessonsCompleted();
  if (!data) return null;
  return (
    <Link to={`/curso/${formatUrl(course.title)}`} className={styles.card}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${course.imageUrl})` }}
      ></div>
      <div className={styles.details}>
        <h1 className={styles.courseTitle}>{course.title}</h1>
        <span className={styles.teacher}>Prof: {course.professor}</span>
        <div className={styles.progress}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressBarCompleted}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={styles.percentage}>{progress}%</span>
        </div>
      </div>
    </Link>
  );
};

export default CourseItem;
