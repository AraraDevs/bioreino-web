import React from 'react';
import useCategoriesContext from 'Hooks/useCategoriesContext';
import Select from 'Components/Forms/Select';

const Categories = ({ selectedPlan }) => {
  const { categories, selectedCategory, setSelectedCategory } =
    useCategoriesContext();
  const [filter, setFilter] = React.useState(categories);

  React.useEffect(() => {
    const filteredCategories = categories.filter(
      (category) => !category.plan || category.plan === selectedPlan
    );
    setFilter(filteredCategories);
  }, [categories, selectedPlan]);

  if (!categories) return null;
  return (
    <Select
      options={filter}
      value={selectedCategory?.name || filter[0].name}
      setValue={(id) => {
        const category = categories.find((category) => category._id === id);
        setSelectedCategory(category || null);
      }}
    />
  );
};

export default Categories;
