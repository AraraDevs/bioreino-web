import React from 'react';
import './Home.css';
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
    <>
      <HomeHeader />
      <HomeIntroduction />
      <HomeApp />
      <HomeCourses />
      <HomeAbout />
      <HomeTestimonies />
      <HomeSign />
      <Footer />
    </>
  );
};

export default Home;
