import React from 'react';
import BasePage from 'pages/BasePage';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';

const TeacherClasses: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your classes" />
      <>YOUR CLASSES</>
    </BasePage>
  );
};

export default TeacherClasses;
