import React from 'react';
import styles from './Select.module.css';
import FieldError from '../Helper/FieldError';

const Select = ({
  label,
  name,
  options,
  value,
  onChange,
  errors,
  isCapitalize,
}) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        className={`${styles.select} ${isCapitalize ? styles.capitalize : ''} ${
          errors[name] ? styles.error : ''
        }`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          Selecione
        </option>
        {options.map((option) => (
          <option key={option.name || option} value={option.name || option}>
            {option.name || option}
          </option>
        ))}
      </select>
      {errors[name] && <FieldError>{errors[name]}</FieldError>}
    </>
  );
};

export default Select;
