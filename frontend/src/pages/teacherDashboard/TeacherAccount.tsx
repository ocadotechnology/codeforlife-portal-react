import React from 'react';
import BasePage from 'pages/BasePage';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';

const TeacherAccount: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your account" />
      <>YOUR ACCOUNT</>
    </BasePage>
  );
};

export default TeacherAccount;
