const FilterPlan = ({ filter, handleFilter, user }) => {
  return (
    <select name="plans" value={filter.plan} onChange={handleFilter}>
      <option value="scholar">Scholar</option>
      {user.plan === 'professional' ? (
        <option value="professional">Professional</option>
      ) : (
        <option value="professional" disabled>
          Professional
        </option>
      )}
    </select>
  );
};

export default FilterPlan;
