import React from 'react';

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido',
  },
  cpf: {
    regex: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    message: 'Preencha um cpf válido',
    formats: {
      regex: [/(\d{3})(\d)/, /(\d{3})(\d)/, /(\d{3})(\d{1,2})$/],
      replaces: ['$1.$2', '$1.$2', '$1-$2'],
    },
  },
  validity: {
    regex: /^\d{2}\/\d{2}$/,
    message: 'Preencha uma data válida',
    formats: {
      regex: [/(\d{2})(\d)/],
      replaces: ['$1/$2'],
    },
  },
  cvv: {
    regex: /^\d{3}$/,
    message: 'Preencha um CVV válido',
  },
};

const useForm = (type, optionsFormat) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate(value) {
    if (type === false) return true;
    if (value.length === 0) {
      setError('Preencha este campo');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function clearInputValue(valueInput, regex) {
    return valueInput.replace(regex, '');
  }

  function setFormat(value) {
    let newInputValue = value;
    if (types[type].formats) {
      types[type].formats.regex.forEach((format, i) => {
        const newFormat = types[type].formats.replaces[i];
        newInputValue = newInputValue.replace(format, newFormat);
      });
    }

    setValue(newInputValue);
  }

  function onChange({ target }) {
    if (optionsFormat && optionsFormat.canFormat) {
      const value = optionsFormat.regex
        ? clearInputValue(target.value, optionsFormat.regex)
        : target.value;

      setFormat(value);
    } else {
      setValue(target.value);
    }
    if (error) validate(target.value);
  }

  return {
    value,
    setValue,
    error,
    setError,
    onChange,
    onBlur: () => validate(value),
    validate: () => validate(value),
  };
};

export default useForm;
