import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`${styles.button} ${styles[className]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
