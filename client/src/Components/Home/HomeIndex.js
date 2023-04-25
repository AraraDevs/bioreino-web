import React from 'react';
import styles from './HomeIndex.module.css';
import PropTypes from 'prop-types';

const Index = ({ scroll, items }) => {
  return (
    <ul className={styles.index}>
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
};

export default Index;
