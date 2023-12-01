const FilterCategories = ({ filter, categories, handleFilter }) => {
  return (
    <select name="categories" value={filter.category} onChange={handleFilter}>
      <option value="all">Todos</option>
      {categories.length > 0 &&
        categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
    </select>
  );
};

export default FilterCategories;
