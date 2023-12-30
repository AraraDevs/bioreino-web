import useCategoriesContext from 'Hooks/useCategoriesContext';
import styles from './Item.module.css';

const Item = ({ course }) => {
  const { filterCategory } = useCategoriesContext();

  function handleClick(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('href');
    const section = document.querySelector(id);
    const header = document.querySelector('header');

    const top = section.offsetTop - header.offsetHeight;

    window.scroll({ top, behavior: 'smooth' });
  }

  const plan = filterCategory(course.category._id);

  return (
    <li className={styles.coursesItem}>
      <a href="#sobre" onClick={handleClick}>
        <span className={styles.plan}>{plan.name}</span>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        ></div>
        <div className={styles.description}>
          <h3 className={styles.title}>{course.title}</h3>
          <span className={styles.teacher}>Prof. {course.professor}</span>
        </div>
      </a>
    </li>
  );
};

export default Item;
