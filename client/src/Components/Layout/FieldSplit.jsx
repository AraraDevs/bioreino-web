import React from 'react';
import styles from './FieldSplit.module.css';

const FieldSplit = ({ children }) => {
  return <div className={styles.fieldSplit}>{children}</div>;
};

export default FieldSplit;
