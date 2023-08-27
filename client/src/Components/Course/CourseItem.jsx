import React from 'react';
import styles from './CourseItem.module.css';
import { Link } from 'react-router-dom';
import FormatURL from '../Helper/FormatURL';
import { UserContext } from '../../Context/UserContext';

const CourseItem = ({ course }) => {
  const { data } = React.useContext(UserContext);
  const [progress, setProgress] = React.useState(0);
  const courseURL = FormatURL(course.title);

  React.useEffect(() => {
    if (data.coursesProgress && data.coursesProgress[course.title]) {
      const totalOfLessonsViewed = data.coursesProgress[course.title].length;
      const totalOfLessonsInTheCourse = course.lessons.length;
      setProgress(
        Math.round((totalOfLessonsViewed / totalOfLessonsInTheCourse) * 100),
      );
    }
  }, [course, data]);

  if (!data) return null;
  return (
    <Link to={`/curso/${courseURL}`} className={styles.card}>
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
