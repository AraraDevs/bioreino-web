import React from 'react';
import styles from './Select.module.css';

const Select = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  isCapitalize,
}) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        className={`${styles.select} ${isCapitalize ? styles.capitalize : ''}`}
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
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default Select;
