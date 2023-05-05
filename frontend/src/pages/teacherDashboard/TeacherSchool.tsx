import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import BasePage from 'pages/BasePage';
import React from 'react';

const TeacherSchool: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your school" />
      <>YOUR SCHOOL</>
    </BasePage>
  );
};

export default TeacherSchool;
