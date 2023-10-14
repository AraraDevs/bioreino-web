import React from 'react';
import styles from './CourseLast.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Clapperboard } from '../../Assets/claquete_aberta.svg';
import FormatURL from '../Helper/FormatURL';
import { UserContext } from '../../Context/UserContext';

const CourseLast = () => {
  const { data: user } = React.useContext(UserContext);

  if (!user.lastCourse) {
    return (
      <p className={styles.info}>
        Quando um curso for iniciado, aparecerá aqui. Tenha um ótimo estudo!
      </p>
    );
  }

  const courseURL = FormatURL(user.lastCourse.courseTitle);
  const lessonURL = FormatURL(user.lastCourse.lastLesson.lessonTitle);

  return (
    <div className={styles.cardLast}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${user.lastCourse.imageUrl})` }}
      ></div>
      <div className={styles.details}>
        <h1 className={styles.courseTitle}>{user.lastCourse.courseTitle}</h1>
        <span className={styles.teacher}>
          Prof: {user.lastCourse.professor}
        </span>
        <hr className={styles.divisor} />
        <h3 className={styles.continue}>Continuar de onde parou:</h3>
        <Link to={`/curso/${courseURL}/${lessonURL}`} className={styles.lesson}>
          <Clapperboard />
          <h2 className={styles.lessonTitle}>
            {user.lastCourse.lastLesson.lessonTitle}
          </h2>
          <p className={styles.lessonDescription}>
            {user.lastCourse.lastLesson.lessonDescription}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CourseLast;
