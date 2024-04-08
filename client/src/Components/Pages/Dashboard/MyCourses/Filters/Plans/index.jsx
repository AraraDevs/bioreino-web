import React from 'react';
import stylesSelect from 'Components/Forms/Select.module.css';
import { PlansContext } from 'Context/Plans';
import Select from 'Components/Forms/Select';
import useModal from 'Hooks/useModal';

const Plans = ({ selectedPlan, setSelectedPlan, user }) => {
  const { plans } = React.useContext(PlansContext);
  const userPlan = plans.find((plan) => plan._id === user.plan);
  const currentPlan = plans.find((plan) => plan._id === selectedPlan);
  const { setModal } = useModal();

  const modalProperties = {
    title: 'Um momento, amigo! 🧐',
    desc: `Para ter acesso às aulas do plano <strong>PROFESSIONAL</strong>, você precisa atualizar seu plano atual (<strong>${userPlan.name.toUpperCase()}</strong>)!!`,
    txtDeny: 'Deixar pra depois',
    txtConfirm: 'Atualizar plano',
    href: '/assinar',
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
          if (itemDisabled)
            setModal(
              modalProperties.title,
              modalProperties.desc,
              modalProperties.txtDeny,
              modalProperties.txtConfirm,
              modalProperties.href
            );
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
