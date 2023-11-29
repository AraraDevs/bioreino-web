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

function getCurrentAndNextLesson(lessons, slug) {
  const indexCurrentLesson = lessons.findIndex((lesson) => {
    return lesson.slug === slug;
  });
  const currentLesson = lessons[indexCurrentLesson];
  const nextLesson = lessons[indexCurrentLesson + 1] || null;

  return [currentLesson, nextLesson];
}

const Lesson = () => {
  const { course: slugCourse, lesson: slugLesson } = useParams();
  const [token] = React.useState(localStorage.getItem('token'));
  const [currentCourse, setCurrentCourse] = React.useState(null);
  const [menu, setMenu] = React.useState(true);

  React.useEffect(() => {
    async function currentCourse() {
      const { url, options } = COURSES_BY_URL_TITLE_GET(slugCourse);

      const response = await fetch(url, options);
      const json = await response.json();

      setCurrentCourse(json);
    }
    currentCourse();
  }, [slugCourse]);

  const lessons = currentCourse?.lessons || [];
  const [currentLesson, nextLesson] = getCurrentAndNextLesson(
    lessons,
    slugLesson,
  );

  React.useEffect(() => {
    async function updateUserLastLessonAndCourse() {
      const { url, options } = USER_LAST_LESSON_COURSE_PATCH(token, {
        courseTitle: currentCourse.title,
        slug: currentCourse.slug,
        professor: currentCourse.professor,
        imageUrl: currentCourse.imageUrl,
        lessonTitle: currentLesson.title,
        lessonDescription: currentLesson.description,
        slugLesson: currentLesson.slug,
      });
      await fetch(url, options);
    }
    if (currentCourse && currentLesson) {
      updateUserLastLessonAndCourse();
    }
  }, [currentCourse, currentLesson, token]);

  React.useEffect(() => {
    async function updateUserCoursesProgress() {
      if (currentCourse && currentLesson) {
        const { url, options } = USER_COURSES_PROGRESS_PATCH(token, {
          courseTitle: currentCourse.title,
          lessonTitle: currentLesson.title,
        });
        await fetch(url, options);
      }
    }
    updateUserCoursesProgress();
  }, [currentCourse, currentLesson, token]);

  if (lessons.length && !slugLesson) {
    return <Navigate to={`/curso/${slugCourse}/${lessons[0].slug}`} />;
  }

  if (!currentCourse) return null;
  return (
    <div className={styles.lessonWrapper}>
      <Head
        title={currentLesson ? currentLesson.title : ''}
        description={currentLesson && currentLesson.description}
      />
      <LessonAside
        menu={menu}
        setMenu={setMenu}
        lessons={lessons}
        slugCourse={slugCourse}
        currentCourse={currentCourse}
      />
      <main className={styles.main}>
        <LessonVideo currentLesson={currentLesson} />
      </main>
      <LessonFooter
        currentCourse={currentCourse}
        nextLesson={nextLesson}
        menuAside={menu}
        slugCourse={slugCourse}
      />
    </div>
  );
};

export default Lesson;
