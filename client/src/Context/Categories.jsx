import React from 'react';

import { CATEGORIES_GET } from '../api';

const CategoriesContext = React.createContext();
CategoriesContext.displayName = 'Categories';

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);

  React.useEffect(() => {
    async function getCategories() {
      const token = localStorage.getItem('token');

      const { url, options } = CATEGORIES_GET(token);
      const responseCourses = await fetch(url, options);
      const json = await responseCourses.json();

      setCategories(json);
    }
    getCategories();
  }, [setCategories]);

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategoriesContext() {
  const { categories, selectedCategory, setSelectedCategory } =
    React.useContext(CategoriesContext);

  const resetSelectedCategory = React.useCallback(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);

  function filterCategory(id) {
    const category = categories.find((category) => category._id === id);
    return category;
  }

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    resetSelectedCategory,
    filterCategory,
  };
}
