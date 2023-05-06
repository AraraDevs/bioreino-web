import React from 'react';
import styles from './HomeIndex.module.css';
import PropTypes from 'prop-types';

const Index = ({ scroll, items, onAction, setOnAction }) => {
  const [topDistOfSections, setTopDistSections] = React.useState(null);

  const checkDistance = React.useCallback(() => {
    topDistOfSections.forEach((distElement) => {
      const distScroll = window.scrollY;
      if (
        distScroll >= distElement.initSize &&
        distScroll < distElement.finalSize
      ) {
        const index = distElement.link;
        index.classList.add('active');
        setOnAction(false);
      } else {
        const index = distElement.link;
        index.classList.remove('active');
      }
    });
  }, [topDistOfSections, setOnAction]);

  React.useEffect(() => {
    function getDistanceSections() {
      const config = sectionsConfig();
      setTopDistSections(config);
    }

    const checkFuncDist = debounce(checkDistance, 50);
    function handleScroll() {
      if (onAction) {
        checkFuncDist();
      } else {
        if (topDistOfSections) {
          checkDistance();
        }
      }
    }

    window.addEventListener('load', getDistanceSections);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('load', getDistanceSections);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkDistance, onAction, topDistOfSections]);

  function sectionsConfig() {
    const links = document.querySelectorAll('[data-indexes] a');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

    const config = [...links].map((link) => {
      const id = link.getAttribute('href');
      const section = document.querySelector(id);
      const initSize = section.offsetTop - headerHeight;
      const finalSize = section.offsetTop + section.offsetHeight - headerHeight;

      return { initSize, finalSize, link };
    });
    return config;
  }

  function debounce(callback, delay) {
    let timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        callback();
      }, delay);
    };
  }

  return (
    <ul className={styles.index} data-indexes>
      {items.map(({ link, text }) => (
        <li key={text}>
          <a onClick={scroll} href={`#${link}`} className={styles.items}>
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
};

Index.propTypes = {
  scroll: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onAction: PropTypes.bool.isRequired,
  setOnAction: PropTypes.func.isRequired,
};

export default Index;
