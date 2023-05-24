import React from 'react';
import DashboardHeader from './DashboardHeader';
import LastCourse from './LastCourse';
import { UserContext } from '../../UserContext';

const Dashboard = () => {
  const userContext = React.useContext(UserContext);
  console.log(userContext.data);
  return (
    <>
      <DashboardHeader
        data={userContext.data}
        userLogout={userContext.userLogout}
      />
      <LastCourse />
    </>
  );
};

export default Dashboard;
