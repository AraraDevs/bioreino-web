import React from 'react';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from 'Context/User';
import Image from 'Components/Helper/Image';

const Item = ({ course }) => {
  const { data } = React.useContext(UserContext);

  const courseInProgress = data.coursesProgress.find(
    ({ _id }) => _id === course._id
  );
  const progress = courseInProgress?.progress || 0;

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

export default React.memo(Item);
