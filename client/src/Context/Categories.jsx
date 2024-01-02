import React from 'react';

import { CATEGORIES_GET } from '../api';

export const CategoriesContext = React.createContext();
CategoriesContext.displayName = 'Categories';

export default function CategoriesProvider({ children }) {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState({});

  React.useEffect(() => {
    async function getCategories() {
      const { url, options } = CATEGORIES_GET();
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
