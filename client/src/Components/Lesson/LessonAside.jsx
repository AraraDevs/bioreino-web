import React from 'react';
import styles from './LessonAside.module.css';
import LogoBioreino from '../LogoBioreino';
import { ReactComponent as Arrow } from '../../Assets/arrow.svg';
import { Link } from 'react-router-dom';
import LessonLessonsItem from './LessonAsideItem';

const LessonAside = ({ menu, setMenu, lessons, currentCourse, currentLesson }) => {
  return (
    <aside className={`${styles.aside} ${menu && styles.active}`}>
      <div className={styles.closeMenu}>
        <button onClick={() => setMenu(!menu)}>
          <Arrow className={styles.arrowMenu} />
        </button>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.dashboard}>
          <Link to="/dashboard">
            <Arrow className={styles.arrowDashboard} />
            <span>Dashboard</span>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.lessonList}>
            {lessons.length > 0 &&
              lessons.map((lesson) => (
                <LessonLessonsItem
                  key={lesson._id}
                  lesson={lesson}
                  courseTitle={currentCourse.title}
                  currentLessonTitle={currentLesson.title}
                />
              ))}
          </ul>
        </nav>
        <div className={styles.bioreino}>
          <LogoBioreino />
        </div>
      </div>
    </aside>
  );
};

export default LessonAside;
