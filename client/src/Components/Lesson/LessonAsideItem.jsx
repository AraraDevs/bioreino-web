import React from 'react';
import styles from './LessonAsideItem.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as OpenClapperboard } from '../../Assets/claquete_aberta.svg';
import { ReactComponent as ClosedClapperboard } from '../../Assets/claquete_fechada.svg';
import { UserContext } from '../../Context/UserContext';
import FormatURL from '../Helper/FormatURL';

const LessonAsideItem = ({ lesson, courseName, courseUrlName }) => {
  const { data: user } = React.useContext(UserContext);
  const [userCoursesProgress, setCoursesProgress] = React.useState(null);
  const [lessonViewed, setLessonViewed] = React.useState(false);
  const lessonURL = FormatURL(lesson.title);
  const { lesson: lessonUrlName } = useParams();

  React.useEffect(() => {
    // set updated coursesProgress 
    setCoursesProgress(user.coursesProgress);
  }, [user]);

  React.useEffect(() => {
    if (userCoursesProgress && userCoursesProgress[courseName]) {
      setLessonViewed(userCoursesProgress[courseName].includes(lesson.title));
    }
  }, [courseName, lesson, userCoursesProgress, lessonUrlName]);

  return (
    <li className={styles.listItem}>
      <NavLink
        to={`/curso/${courseUrlName}/${lessonURL}`}
        className={styles.link}
      >
        {lessonViewed ? (
          <ClosedClapperboard className={styles.clapperboard} />
        ) : (
          <OpenClapperboard className={styles.clapperboard} />
        )}
        <div className={styles.infos}>
          <p>{lesson.title}</p>
          <span>{lesson.description}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default LessonAsideItem;
