import React from 'react';

const FormatURL = (url) => {
  const [formattedURL, setFormattedURL] = React.useState('');

  React.useEffect(() => {
    const newURL = url
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    setFormattedURL(newURL);
  }, [url]);

  return formattedURL;
};

export default FormatURL;
