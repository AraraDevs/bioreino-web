import React from 'react';
import styles from './Course.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../../../Context/User';
import Image from '../../../../../Helper/Image';

function setCoursesProgress(user, course) {
  let progress = 0;
  if (user.coursesProgress?.[course.title]) {
    const totalOfLessonsViewed = user.coursesProgress[course.title].length;
    const totalOfLessonsInTheCourse = course.lessons.length;

    progress = Math.round(
      (totalOfLessonsViewed / totalOfLessonsInTheCourse) * 100,
    );
  }
  return progress;
}

const Course = ({ course }) => {
  const { data } = React.useContext(UserContext);

  const progress = setCoursesProgress(data, course);

  if (!data) return null;
  return (
    <Link
      to={`/curso/${course.slug}`}
      className={styles.card}
      title={course.title}
    >
      <Image src={course.imageUrl} alt={course.title} />
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

export default React.memo(Course);
