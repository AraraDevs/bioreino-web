const fixedNumber = (value, numberOfDecimals = 2) => {
  return value.toFixed(numberOfDecimals).replace('.', ',');
};

export default fixedNumber;
