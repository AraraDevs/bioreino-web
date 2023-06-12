import React from 'react';
import styles from './LessonFooter.module.css';
import { ReactComponent as Arrow } from '../../Assets/arrow.svg';
import { Link } from 'react-router-dom';

const LessonFooter = ({ currentCourse, nextLesson, menuAside }) => {
  if (!currentCourse) return null;
  return (
    <footer
      className={`${styles.footer} `}
    >
      <div className={`${styles.wrapper} ${menuAside ? styles.menuActive : ''}`}>
        <div>
          <h1 className={styles.title}>{currentCourse.title}</h1>
          <span className={styles.prof}>Prof: {currentCourse.professor}</span>
        </div>
        {nextLesson ? (
          <Link
            to={`/curso/${nextLesson.courseUrl}/${nextLesson.lessonUrl}`}
            className={styles.next}
          >
            Próxima Aula <Arrow />
          </Link>
        ) : (
          <Link to="/dashboard" className={styles.next}>
            dashboard <Arrow />
          </Link>
        )}
      </div>
    </footer>
  );
};

export default LessonFooter;
