import React from 'react';
import styles from './LessonAsideItem.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as OpenClapperboard } from '../../Assets/claquete_aberta.svg';
import { ReactComponent as ClosedClapperboard } from '../../Assets/claquete_fechada.svg';
import { UserContext } from '../../Context/UserContext';

import FormatURL from '../Helper/formatURL';

const LessonAsideItem = ({ lesson, courseTitle, currentLessonTitle }) => {
  const { lesson: lessonUrlName } = useParams();
  const { course: courseUrlName } = useParams();
  const { data } = React.useContext(UserContext);
  const [lessonViewed, setLessonViewed] = React.useState(false);
  const lessonURL = FormatURL(lesson.title);

  React.useEffect(() => {
    if (data.coursesProgress && data.coursesProgress[courseTitle]) {
      const lessonIsViewed = data.coursesProgress[courseTitle].includes(lesson.title);

      setLessonViewed(lessonIsViewed);
    }
  }, [courseTitle, currentLessonTitle, lesson, data, lessonUrlName]);

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
