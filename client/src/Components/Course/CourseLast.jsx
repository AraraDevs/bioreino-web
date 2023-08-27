import React from 'react';
import styles from './CourseLast.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Clapperboard } from '../../Assets/claquete_aberta.svg';
import FormatURL from '../Helper/FormatURL';
import { UserContext } from '../../Context/UserContext';

const CourseLast = () => {
  const { data } = React.useContext(UserContext);
  const courseURL = FormatURL(data.lastCourse.courseTitle);
  const lessonURL = FormatURL(data.lastCourse.lastLesson.lessonTitle);

  if (!data.lastCourse) {
    return (
      <p className={styles.info}>
        Quando um curso for iniciado, aparecerá aqui. Tenha um ótimo estudo!
      </p>
    );
  }
  return (
    <div className={styles.cardLast}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${data.lastCourse.imageUrl})` }}
      ></div>
      <div className={styles.details}>
        <h1 className={styles.courseTitle}>{data.lastCourse.courseTitle}</h1>
        <span className={styles.teacher}>
          Prof: {data.lastCourse.professor}
        </span>
        <hr className={styles.divisor} />
        <h3 className={styles.continue}>Continuar de onde parou:</h3>
        <Link to={`/curso/${courseURL}/${lessonURL}`} className={styles.lesson}>
          <Clapperboard />
          <div>
            <h2 className={styles.lessonTitle}>
              {data.lastCourse.lastLesson.lessonTitle}
            </h2>
            <p className={styles.lessonDescription}>
              {data.lastCourse.lastLesson.lessonDescription}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseLast;
