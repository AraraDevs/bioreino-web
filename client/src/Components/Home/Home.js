import React from 'react';
import './Home.css';
import Header from './Header';
import Introduction from './HomeIntroduction';
import HomeCourses from './HomeCourses';
import HomeAbout from './HomeAbout';
import HomeTestimonies from './HomeTestimonies';
import HomeApp from './HomeApp';
import HomeSign from './HomeSign';
import Footer from '../Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Introduction />
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
