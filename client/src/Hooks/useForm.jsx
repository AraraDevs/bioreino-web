import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido',
  },
  password: {
    regex: /^.{8,}/,
    message: 'A senha precisa ter pelo menos 8 caracteres',
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    message: 'Preencha um cpf válido',
  },
};

const useForm = (input, customValidate, pattern) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState('');

  function onChange({ target }) {
    let value = target.value;
    if (pattern) {
      value = formatter(value);
    }
    if (error) validate(value);
    setValue(value);
  }

  function formatter(value) {
    const cleanValue = value.replace(/\D/g, '');

    let newValue = '';
    let digitIndex = 0;
    for (let i = 0; i < pattern.length; i++) {
      let maskChar = pattern[i];

      if (maskChar === 'X' && digitIndex < cleanValue.length) {
        newValue += cleanValue[digitIndex];
        digitIndex++;
      } else if (maskChar === value[i]) {
        newValue += value[i];
      } else if (maskChar !== 'X' && cleanValue[digitIndex]) {
        newValue += maskChar;
      } else {
        break;
      }
    }

    return newValue;
  }

  function validate(value) {
    const type = input.type;
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha este campo');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      if (customValidate) {
        const valid = customValidate(value, setError);
        if (valid === false) return false;
      }

      setError('');
      return true;
    }
  }

  function scrollToFieldError() {
    const field = document.querySelector(`[name="${input.name}"]`);
    field.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return {
    value,
    setValue,
    error,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
    scrollToFieldError,
  };
};

export default useForm;
