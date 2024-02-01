import React from 'react';
import stylesSelect from 'Components/Forms/Select.module.css';
import { PlansContext } from 'Context/Plans';
import Select from 'Components/Forms/Select';
import showModal from 'Components/Helper/showModal';

const Plans = ({ selectedPlan, setSelectedPlan, user }) => {
  const { plans } = React.useContext(PlansContext);
  const userPlan = plans.find((plan) => plan._id === user.plan);
  const currentPlan = plans.find((plan) => plan._id === selectedPlan);

  const modalProperties = {
    title: 'Aprimorar plano de assinatura',
    description: `Para ter acesso aos cursos deste plano é necessário aprimorar o seu plano atual <strong>${userPlan.name.toUpperCase()}</strong> para o plano <strong>PROFESSIONAL</strong>. Gostaria de ser redirecionado para a página de cadastro?`,
    textDeny: 'Deixar pra depois',
    textConfirm: 'Vamos nessa!',
    anchor: {
      active: true,
      href: '/comprar/professional',
    },
  };

  function handleChange(id) {
    if (currentPlan._id === id) return;
    setSelectedPlan(id);
  }

  function customSelectItems(plan, setValue) {
    const planIsFullAccess = !!plan.fullaccess;
    const userHasFullAccess = planIsFullAccess && !!userPlan.fullaccess;
    const itemDisabled = !userHasFullAccess && planIsFullAccess;

    return (
      <li
        key={plan._id}
        className={`${stylesSelect.option} ${
          currentPlan._id === plan._id ? stylesSelect.active : ''
        } ${itemDisabled && stylesSelect.disabled}`}
        onClick={() => {
          if (itemDisabled) showModal(modalProperties);
          else setValue(plan._id);
        }}
      >
        {plan.name}
      </li>
    );
  }

  return (
    <Select
      options={plans}
      value={currentPlan.name}
      setValue={handleChange}
      customOptionMap={customSelectItems}
    />
  );
};

export default Plans;
