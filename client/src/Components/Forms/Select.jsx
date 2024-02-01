import React from 'react';
import styles from './Select.module.css';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Select = ({
  options,
  value,
  setValue,
  fullWidth,
  customOptionMap,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <button
      type="button"
      className={`${styles.ordenador} ${open ? styles.active : ''} ${
        fullWidth ? styles.fullWidth : ''
      }`}
      onClick={() => setOpen(!open)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      <span>
        {value}

        {open ? (
          <MdKeyboardArrowUp size={20} />
        ) : (
          <MdKeyboardArrowDown size={20} />
        )}
      </span>
      <ul className={`${styles.options} ${open ? styles.active : ''}`}>
        {React.useMemo(
          () =>
            options.map((option) =>
              customOptionMap ? (
                customOptionMap(option, setValue)
              ) : (
                <li
                  key={option._id || option}
                  className={`${styles.option} ${
                    value === option.name || value === option
                      ? styles.active
                      : ''
                  }`}
                  onClick={() => setValue(option._id || option)}
                >
                  {option.name || option}
                </li>
              )
            ),
          [customOptionMap, options, setValue, value]
        )}
      </ul>
    </button>
  );
};

export default Select;
