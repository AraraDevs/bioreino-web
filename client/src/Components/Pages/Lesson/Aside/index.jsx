import styles from './Aside.module.css';
import LogoBioreino from 'Components/Layout/LogoBioreino';
import { ReactComponent as Arrow } from 'src/Assets/arrow.svg';
import { Link } from 'react-router-dom';
import Item from './Item';

const Aside = ({ menu, setMenu, lessons, currentCourse }) => {
  return (
    <aside className={`${styles.aside} ${menu ? styles.active : ''}`}>
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
            {lessons.map((lesson) => (
              <Item
                key={lesson._id}
                lesson={lesson}
                courseTitle={currentCourse.title}
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

export default Aside;
