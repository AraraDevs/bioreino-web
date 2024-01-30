import React from 'react';
import { CategoriesContext } from 'Context/Categories';

export default function useCategoriesContext() {
  const { categories, selectedCategory, setSelectedCategory } =
    React.useContext(CategoriesContext);
  if (!categories && !selectedCategory && !setSelectedCategory) {
    throw new Error(
      'useCategoriesContext deve ser usado dentro de um CategoriesProvider'
    );
  }

  const resetSelectedCategory = React.useCallback(() => {
    setSelectedCategory({});
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
