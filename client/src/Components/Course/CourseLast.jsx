import React from 'react';
import styles from './CourseLast.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Clapperboard } from '../../Assets/claquete_aberta.svg';
import formatUrl from '../Helper/formatUrl';

const CourseLast = ({ user }) => {
  if (!user.lastCourse) return <p className={styles.information}>Quando um curso for iniciado, ele apacerá aqui. Tenha um ótimo estudo!</p>;
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
        <Link
          to={`/curso/${formatUrl(user.lastCourse.courseTitle)}/${formatUrl(
            user.lastCourse.lastLesson.title,
          )}`}
          className={styles.lesson}
        >
          <Clapperboard />
          <div>
            <h2 className={styles.lessonTitle}>
              {user.lastCourse.lastLesson.title}
            </h2>
            <p className={styles.lessonDescription}>
              {user.lastCourse.lastLesson.description}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CourseLast;
