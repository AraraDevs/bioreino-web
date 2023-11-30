import React from 'react';
import styles from './Course.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Clapperboard } from '../../../../../Assets/claquete_aberta.svg';
import { UserContext } from '../../../../../Context/UserContext';
import Image from '../../../../Helper/Image';

const Course = () => {
  const { data: user } = React.useContext(UserContext);

  if (!user.lastCourse) {
    return (
      <p className={styles.info}>
        Quando um curso for iniciado, aparecerá aqui. Tenha um ótimo estudo!
      </p>
    );
  }

  const slugCourse = user.lastCourse.slug;
  const slug = user.lastCourse.lastLesson.slug;

  return (
    <div className={styles.cardLast}>
      <Image src={user.lastCourse.imageUrl} alt={user.lastCourse.courseTitle} />
      <div className={styles.details}>
        <h1 className={styles.courseTitle} title={user.lastCourse.courseTitle}>
          {user.lastCourse.courseTitle}
        </h1>
        <span className={styles.teacher}>
          Prof: {user.lastCourse.professor}
        </span>
        <hr className={styles.divisor} />
        <h3 className={styles.continue}>Continuar de onde parou:</h3>
        <Link to={`/curso/${slugCourse}/${slug}`} className={styles.lesson}>
          <Clapperboard />
          <h2
            className={styles.lessonTitle}
            title={user.lastCourse.lastLesson.lessonTitle}
          >
            {user.lastCourse.lastLesson.lessonTitle}
          </h2>
          <p
            className={styles.lessonDescription}
            title={user.lastCourse.lastLesson.lessonDescription}
          >
            {user.lastCourse.lastLesson.lessonDescription}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Course;
