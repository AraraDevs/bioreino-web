import React from 'react';

const Error = ({ error }) => {
  if (!error) return null;
  return <p style={{ color: 'rgb(255, 51, 17)', marginTop: '1rem' }}>{error}</p>;
};

export default Error;
