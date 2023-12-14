import React from 'react';
import { useCategoriesContext } from '../../../../../../Context/Categories';

const Categories = ({ plan }) => {
  const { categories, selectedCategory, setSelectedCategory } = useCategoriesContext();
  const [filter, setFilter] = React.useState(categories);

  React.useEffect(() => {
    const filteredCategories = categories.filter(
      (category) => category.plan === plan,
    );
    setFilter(filteredCategories);
  }, [categories, plan]);

  return (
    <select
      name="categories"
      value={selectedCategory?.name || ''}
      onChange={({ target }) => {
        const category = categories.find(
          (category) => category.name === target.value,
        );
        setSelectedCategory(category || null);
      }}
    >
      <option value="">Todos</option>
      {filter.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default Categories;
