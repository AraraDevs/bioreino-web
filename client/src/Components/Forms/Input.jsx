import React from 'react';
import styles from './Input.module.css';
import FieldError from '../Helper/FieldError';

const Input = ({
  label,
  type,
  name,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
  max,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${styles.input} ${error ? styles.error : ''}`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={max}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default Input;
