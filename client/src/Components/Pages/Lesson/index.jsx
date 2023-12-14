import React from 'react';
import styles from './Lesson.module.css';
import { Navigate, useParams } from 'react-router-dom';
import Aside from './Aside';
import Video from './Video';
import Footer from './Footer';
import Head from '../../Helper/Head';
import { useCoursesContext } from '../../../Context/Courses';
import { UserContext } from '../../../Context/User';

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
  const { updateLastLessonAndCourse, updateCoursesProgress } =
    React.useContext(UserContext);
  const { courses } = useCoursesContext();
  const [currentCourse, setCurrentCourse] = React.useState(null);
  const [menu, setMenu] = React.useState(true);

  React.useEffect(() => {
    const course = courses.find((course) => course.slug === slugCourse);
    setCurrentCourse(course);
  }, [courses, slugCourse]);

  const lessons = React.useMemo(
    () => currentCourse?.lessons || [],
    [currentCourse?.lessons],
  );
  const [currentLesson, nextLesson] = getCurrentAndNextLesson(
    lessons,
    slugLesson,
  );

  React.useEffect(() => {
    if (currentLesson) {
      updateLastLessonAndCourse({
        courseTitle: currentCourse.title,
        slug: currentCourse.slug,
        professor: currentCourse.professor,
        imageUrl: currentCourse.imageUrl,
        lessonTitle: currentLesson.title,
        lessonDescription: currentLesson.description,
        slugLesson: currentLesson.slug,
      });

      updateCoursesProgress({
        courseTitle: currentCourse.title,
        lessonTitle: currentLesson.title,
      });
    }
  }, [
    currentCourse,
    currentLesson,
    updateLastLessonAndCourse,
    updateCoursesProgress,
  ]);

  if (lessons.length && !slugLesson) {
    const firstLessonSlug = lessons[0].slug;
    return <Navigate to={`/curso/${slugCourse}/${firstLessonSlug}`} />;
  }

  if (!currentCourse) return null;
  return (
    <div className={styles.lessonWrapper}>
      <Head
        title={currentLesson ? currentLesson.title : ''}
        description={currentLesson && currentLesson.description}
      />
      <Aside
        menu={menu}
        setMenu={setMenu}
        lessons={lessons}
        slugCourse={slugCourse}
        currentCourse={currentCourse}
      />
      <main className={styles.main}>
        <Video currentLesson={currentLesson} />
      </main>
      <Footer
        currentCourse={currentCourse}
        nextLesson={nextLesson}
        menuAside={menu}
        slugCourse={slugCourse}
      />
    </div>
  );
};

export default Lesson;
