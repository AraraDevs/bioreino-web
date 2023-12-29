import React from 'react';
import { PLANS_GET } from '../api';

export const PlansContext = React.createContext();

export default function PlansProvider({ children }) {
  const [plans, setPlans] = React.useState();

  React.useEffect(() => {
    async function getPlans() {
      const { url, options } = PLANS_GET();
      const response = await fetch(url, options);
      const json = await response.json();

      setPlans(json);
    }
    getPlans();
  }, []);

  return (
    <PlansContext.Provider value={{ plans }}>{children}</PlansContext.Provider>
  );
}
