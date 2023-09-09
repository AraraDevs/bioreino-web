import React from 'react';
import styles from './Lesson.module.css';
import { Navigate, useParams } from 'react-router-dom';
import LessonAside from './LessonAside';
import LessonVideo from './LessonVideo';
import {
  COURSES_BY_URL_TITLE_GET,
  USER_LAST_LESSON_COURSE_PATCH,
  USER_COURSES_PROGRESS_PATCH,
} from '../../api';
import LessonFooter from './LessonFooter';
import Head from '../Helper/Head';

const Lesson = () => {
  const { course: courseUrlName, lesson: lessonUrlName } = useParams();
  const [token] = React.useState(localStorage.getItem('token'));
  const [currentCourse, setCurrentCourse] = React.useState({});
  const [lessonsList, setLessonsList] = React.useState([]);
  const [menu, setMenu] = React.useState(true);

  React.useEffect(() => {
    async function getCurrentCourse() {
      const { url, options } = COURSES_BY_URL_TITLE_GET(courseUrlName);

      const response = await fetch(url, options);
      const json = await response.json();

      setCurrentCourse(json);
      setLessonsList(json.lessons);
    }
    getCurrentCourse();
  }, [courseUrlName]);

  const lessons = createCurrentAndNextLesson(lessonsList, lessonUrlName);

  React.useEffect(() => {
    async function updateUserLastLessonAndCourse() {
      if (currentCourse && lessons.current) {
        const { url, options } = USER_LAST_LESSON_COURSE_PATCH(token, {
          courseTitle: currentCourse.title,
          professor: currentCourse.professor,
          imageUrl: currentCourse.imageUrl,
          lessonTitle: lessons.current.title,
          lessonDescription: lessons.current.description,
        });
        await fetch(url, options);
      }
    }
    updateUserLastLessonAndCourse();
  }, [currentCourse, lessons, token, lessonUrlName]);

  React.useEffect(() => {
    async function updateUserCoursesProgress() {
      if (currentCourse && lessons.current) {
        const { url, options } = USER_COURSES_PROGRESS_PATCH(token, {
          courseTitle: currentCourse.title,
          lessonTitle: lessons.current.title,
        });
        await fetch(url, options);
      }
    }
    updateUserCoursesProgress();
  }, [lessons, currentCourse, token]);

  if (lessonsList.length && !lessonUrlName) {
    return (
      <Navigate to={`/curso/${courseUrlName}/${lessonsList[0].lessonUrl}`} />
    );
  }

  if (!currentCourse) return null;
  return (
    <div className={styles.lessonWrapper}>
      <Head
        title={lessons.current ? lessons.current.title : ''}
        description={lessons.current && lessons.current.description}
      />
      <LessonAside
        menu={menu}
        setMenu={setMenu}
        lessons={lessonsList}
        courseUrlName={courseUrlName}
        courseName={currentCourse.title}
      />
      <main className={styles.main}>
        <LessonVideo currentLesson={lessons.current} />
      </main>
      <LessonFooter
        currentCourse={currentCourse}
        nextLesson={lessons.next}
        menuAside={menu}
        courseUrlName={courseUrlName}
      />
    </div>
  );
};

export default Lesson;

function createCurrentAndNextLesson(lessons, lessonUrl) {
  const currentLesson = lessons.find((lesson) => {
    return lesson.lessonUrl === lessonUrl;
  });

  const nextLessonIndex = lessons.indexOf(currentLesson) + 1;

  return {
    current: currentLesson,
    next: lessons[nextLessonIndex] || null,
  };
}
