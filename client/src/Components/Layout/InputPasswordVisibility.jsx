import React from 'react';
import styles from './InputPasswordVisibility.module.css';

import Input from 'Components/Forms/Input';

import { ReactComponent as VisibilityOff } from 'src/Assets/visibility-off.svg';
import { ReactComponent as VisibilityOn } from 'src/Assets/visibility.svg';

const InputPasswordVisibility = ({ label, passwordFormProps }) => {
  const [visiblePassword, setVisiblePassword] = React.useState(false);

  return (
    <div className={styles.groupPassword}>
      <Input
        label={label}
        type={visiblePassword ? 'text' : 'password'}
        name="password"
        {...passwordFormProps}
      />
      <span
        className={styles.visibility}
        onClick={() => setVisiblePassword(!visiblePassword)}
      >
        {visiblePassword ? <VisibilityOn /> : <VisibilityOff />}
      </span>
    </div>
  );
};

export default InputPasswordVisibility;
