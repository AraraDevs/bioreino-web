import React from 'react';
import { CategoriesContext } from 'Context/Categories';

export default function useCategoriesContext() {
  const { categories, selectedCategory, setSelectedCategory } =
    React.useContext(CategoriesContext);

  const resetSelectedCategory = React.useCallback(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);

  function filterCategory(id) {
    return categories.find((category) => category._id === id);
  }

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    resetSelectedCategory,
    filterCategory,
  };
}
