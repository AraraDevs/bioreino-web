import React from 'react';
import styles from './Item.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as OpenClapperboard } from '../../../../../Assets/claquete_aberta.svg';
import { ReactComponent as ClosedClapperboard } from '../../../../../Assets/claquete_fechada.svg';
import { UserContext } from '../../../../../Context/User';

const Item = ({ lesson, courseTitle }) => {
  const { course: slugCourse } = useParams();
  const { data: user } = React.useContext(UserContext);

  let lessonViewed = false;
  if (user?.coursesProgress?.[courseTitle]) {
    const lessonIsViewed = user.coursesProgress[courseTitle].includes(
      lesson.title,
    );

    lessonViewed = lessonIsViewed;
  }

  return (
    <li className={styles.listItem}>
      <NavLink
        to={`/curso/${slugCourse}/${lesson.slug}`}
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

export default Item;
