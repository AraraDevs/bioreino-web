import React from 'react';

const Plans = ({ plan, setPlan, user }) => {
  function handleChange({ target }) {
    if (target.value === 'professional' && user.plan === 'scholar') return;
    setPlan(target.value);
  }

  return (
    <select name="plans" value={plan} onChange={handleChange}>
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

export default React.memo(Plans);
