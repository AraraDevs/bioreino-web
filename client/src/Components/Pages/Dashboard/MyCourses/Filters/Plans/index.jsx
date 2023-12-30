import React from 'react';
import { PlansContext } from 'Context/Plans';

const Plans = ({ selectedPlan, setSelectedPlan, user }) => {
  const { plans } = React.useContext(PlansContext);
  const currentPlan = plans.find((plan) => plan._id === selectedPlan);
  const userPlan = plans.find((plan) => plan._id === user.plan);

  function handleChange({ target }) {
    if (currentPlan._id === target.value) return;
    setSelectedPlan(target.value);
  }

  return (
    <select name="plans" value={selectedPlan} onChange={handleChange}>
      {plans.map((plan) => {
        if (plan.fullaccess && !userPlan.fullaccess) {
          return (
            <option key={plan._id} value={currentPlan._id} disabled>
              {plan.name}
            </option>
          );
        }

        return (
          <option key={plan._id} value={plan._id}>
            {plan.name}
          </option>
        );
      })}
    </select>
  );
};

export default React.memo(Plans);
