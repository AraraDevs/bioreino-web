/**
 * Formata uma string para uso em uma URL.
 * @param {string} url - A string a ser formatada.
 * @returns {string} A string formatada para uso em uma URL.
 */
const formatURL = (url) => {
  const normalizedURL = url
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  return normalizedURL;
};

export default formatURL;
