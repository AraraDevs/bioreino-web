import React from 'react';

const useForm = (initialState, customValidationRules, formats) => {
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});

  const validationRules = customValidationRules;

  function validate(values) {
    const validationErrors = {};
    const invalidFields = [];

    Object.keys(validationRules).forEach((fieldName) => {
      const validation = validationRules[fieldName];

      if (validation) {
        if (values[fieldName] === '') {
          invalidFields.push(fieldName);
          validationErrors[fieldName] = 'Preencha este campo';
        } else if (
          validation.regex &&
          !validation.regex.test(values[fieldName])
        ) {
          invalidFields.push(fieldName);
          validationErrors[fieldName] = validation.message;
        } else if (validation.customValidation) {
          const customError = validation.customValidation(
            values[fieldName],
            values,
          );

          if (customError) {
            invalidFields.push(fieldName);
            validationErrors[fieldName] = customError;
          }
        }
      }
    });
    return { validationErrors, invalidFields };
  }

  function onChange({ target }) {
    const { value, name } = target;

    formattedInputs(target);

    if (errors[name]) {
      const { validationErrors } = validate({ ...values, [name]: value });
      setErrors(validationErrors);
    }
  }

  function isSubmitValid(e) {
    e.preventDefault();

    const { validationErrors, invalidFields } = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      return true;
    } else {
      const firstErrorField = document.querySelector(
        `[name="${invalidFields[0]}"]`,
      );
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
  }

  function formattedInputs(target) {
    const { value, name } = target;

    const fieldFormatting = formats[name];

    const pattern = fieldFormatting?.pattern;

    if (pattern) {
      let formattedValue = '';
      const numericValue = value.replace(/\D/g, '');

      let digitIndex = 0;
      for (let maskChar of pattern) {
        if (maskChar === 'X' && digitIndex < numericValue.length) {
          formattedValue += numericValue[digitIndex];
          digitIndex++;
        } else if (maskChar !== 'X' && numericValue[digitIndex]) {
          formattedValue += maskChar;
        } else {
          break;
        }
      }

      // Executes the custom formatting method if the fieldFormatting has it
      if (fieldFormatting.customFormatting) {
        formattedValue = fieldFormatting.customFormatting(formattedValue);
      }

      setValues({ ...values, [name]: formattedValue });
      return;
    }
    setValues({ ...values, [name]: value });
  }

  return {
    values,
    onChange,
    errors,
    isSubmitValid,
  };
};

export default useForm;
