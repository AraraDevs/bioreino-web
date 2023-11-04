/**
 * Formata uma string para uso em uma URL.
 * @param {string} url - A string a ser formatada.
 * @returns {string} A string formatada para uso em uma URL.
 */
const formatURL = (url) => {
  const normalizedURL = url
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')

  return normalizedURL;
};

export default formatURL;
