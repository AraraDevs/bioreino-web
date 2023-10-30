import React from 'react';
import styles from './FieldError.module.css';

const FieldError = ({ children }) => {
  return <p className={styles.error}>{children}</p>;
};

export default FieldError;
