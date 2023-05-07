import React from 'react';
import styles from './Home.module.css';
import HomeHeader from './HomeHeader';
import HomeIntroduction from './HomeIntroduction';
import HomeCourses from './HomeCourses';
import HomeAbout from './HomeAbout';
import HomeTestimonies from './HomeTestimonies';
import HomeApp from './HomeApp';
import HomeSign from './HomeSign';
import Footer from '../Footer';

const Home = () => {
  return (
    <div className={styles.home}>
      <HomeHeader />
      <HomeIntroduction />
      <HomeApp />
      <HomeCourses />
      <HomeAbout />
      <HomeTestimonies />
      <HomeSign />
      <Footer />
    </div>
  );
};

export default Home;
