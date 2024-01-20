import React from 'react';
import styles from './Select.module.css';
import Label from './Label';
import FieldError from 'Components/Helper/FieldError';

const Select = ({
  label,
  name,
  error,
  options,
  firstOption,
  value,
  onChange,
  isCapitalize,
}) => {
  return (
    <Label label={label} name={name}>
      <select
        className={`${styles.select} ${isCapitalize ? styles.capitalize : ''} ${
          error && styles.error
        }`}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {firstOption ? (
          <option disabled value="">
            {firstOption.length ? firstOption : 'Selecione'}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option._id || option} value={option._id || option}>
            {option.name || option}
          </option>
        ))}
      </select>
      {error && <FieldError>{error}</FieldError>}
    </Label>
  );
};

export default Select;
