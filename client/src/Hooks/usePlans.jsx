const types = [
  {
    name: 'scholar',
    benefits: [
      'Acesso aos cursos para estudantes do ensino fundamental e médio',
      'Preparo para vestibular',
      '12 meses de acesso ilimitado',
    ],
    price: '300,00',
  },
  {
    name: 'professional',
    benefits: [
      'Acesso aos cursos para estudantes do ensino fundamental e médio',
      'Cursos voltados para mercado de trabalho',
      '12 meses de acesso ilimitado',
      'Certificado de conclusão',
    ],
    price: '849,99',
  },
];

const usePlans = () => {
  function allPlans() {
    return types;
  }

  function getPlanPrice(plan) {
    if (!plan) return;

    const chosenPlan = types.find((item) => item.name === plan);
    const price = Number(chosenPlan.price.replace(',', '.')).toFixed(2);

    return price;
  }

  return { allPlans: allPlans(), getPlanPrice };
};

export default usePlans;
