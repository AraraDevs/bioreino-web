import React from 'react';
import styles from './Item.module.css';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as OpenClapperboard } from 'src/Assets/claquete_aberta.svg';
import { ReactComponent as ClosedClapperboard } from 'src/Assets/claquete_fechada.svg';
import { UserContext } from 'Context/User';

const Item = ({ lesson, courseId }) => {
  const { course: slugCourse } = useParams();
  const { data: user } = React.useContext(UserContext);
  const [viewed, setViewed] = React.useState(false);

  React.useEffect(() => {
    const course = user.coursesProgress.find(
      (course) => course._id === courseId
    );
    if (course) {
      const lessonViewed = course.lessonsViewed.includes(lesson._id);

      setViewed(lessonViewed);
    }
  }, [user, courseId, lesson]);

  return (
    <li className={styles.listItem}>
      <NavLink
        to={`/curso/${slugCourse}/${lesson.slug}`}
        className={styles.link}
      >
        {viewed ? (
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
