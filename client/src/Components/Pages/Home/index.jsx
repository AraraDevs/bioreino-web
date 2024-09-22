import React from 'react';
import styles from './Home.module.css';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header';
import Introduction from './Introduction';
import Courses from './Courses';
import About from './About';
import Testimonies from './Testimonies';
import Subscribe from './Subscribe';
import Footer from 'Components/Layout/Footer';
import Head from 'Components/Helper/Head';
import { ReactComponent as GitHub } from 'src/Assets/github.svg';

const Home = () => {
  return (
    <>
      <Analytics />
      <Head
        title="Home"
        description="Home da bioreino para apresentar a plataforma"
      />
      <div className={styles.home}>
        <Header />
        <Introduction />
        <section className="container">
          <div className={styles.wrapper}>
            <p>
              Prefere ver as aulas pelo smartphone? Sem problemas! Nossos alunos
              têm acesso a nossa plataforma também pelos dispositivos móveis
            </p>

            <a
              className={styles.github}
              href="https://github.com/AraraDevs/bioreino-android"
              target="_blank"
              rel="noreferrer"
            >
              <GitHub />
            </a>
          </div>
        </section>
        <Courses />
        <About />
        <Testimonies />
        <Subscribe />
        <Footer />
      </div>
    </>
  );
};

export default Home;
