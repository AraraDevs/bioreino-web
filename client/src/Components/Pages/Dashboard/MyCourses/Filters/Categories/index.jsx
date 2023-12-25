import React from 'react';
import useCategoriesContext from 'Hooks/useCategoriesContext';

const Categories = ({ plan }) => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoriesContext();
  const [filter, setFilter] = React.useState([]);

  React.useEffect(() => {
    const filteredCategories = categories.filter(
      (category) => !category.plan || category.plan === plan,
    );
    setFilter(filteredCategories);
  }, [categories, plan]);

  return (
    <select
      name="categories"
      value={selectedCategory?.value || ''}
      onChange={({ target }) => {
        const category = categories.find(
          (category) => category.value === target.value,
        );
        setSelectedCategory(category || null);
      }}
    >
      {filter.map((category) => (
        <option key={category._id} value={category.value}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default Categories;
