const debounce = (callback, delay) => {
  let timer;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, delay);
  };
};

export default debounce;
