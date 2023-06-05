import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardLastCourse from './DashboardLastCourse';
import DashboardMyCourse from './DashboardMyCourse';

const Dashboard = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardLastCourse />
      <DashboardMyCourse />
    </>
  );
};

export default Dashboard;
