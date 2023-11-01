import React from 'react';
import styles from './Input.module.css';
import FieldError from '../Helper/FieldError';

const Input = ({
  label,
  type,
  name,
  errors,
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
        className={`${styles.input} ${errors[name] ? styles.error : ''}`}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={max}
      />
      {errors[name] && <FieldError>{errors[name]}</FieldError>}
    </div>
  );
};

export default Input;
