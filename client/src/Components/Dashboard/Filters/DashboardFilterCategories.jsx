import React from 'react';

const DashboardFilterCategories = ({
  filter,
  filteredCategories,
  handleFilter,
}) => {
  return (
    <select name="categories" value={filter.category} onChange={handleFilter}>
      <option value="all">Todos</option>
      {filteredCategories.length > 0 &&
        filteredCategories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default DashboardFilterCategories;
