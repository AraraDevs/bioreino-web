import React from 'react';

const Categories = ({ categories, category, setCategory, plan }) => {
  const [filter, setFilter] = React.useState(categories);

  React.useEffect(() => {
    setCategory(null);
  }, [plan, setCategory]);

  React.useEffect(() => {
    const filteredCategories = categories.filter(
      (category) => category.plan === plan,
    );
    setFilter(filteredCategories);
  }, [categories, plan]);

  return (
    <select
      name="categories"
      value={category?.name || ''}
      onChange={({ target }) => {
        const selectedCategory =
          categories.find((category) => category.name === target.value) || null;
        setCategory(selectedCategory);
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
