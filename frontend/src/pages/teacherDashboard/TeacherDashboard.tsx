import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import YourSchool from './YourSchool';
import Classes from './classes/Classes';
import YourAccount from './account/YourAccount';

const TeacherDashboard: React.FC<{
  tab: number;
  movingClass?: boolean
}> = ({ tab, movingClass = false }) => {
  // TODO: get from API.
  const userName = 'John Doe';

  return (
    <Page.Container>
      <Page.TabBar
        header={`Welcome back, ${userName}`}
        value={tab}
        originalPath='/teacher/dashboard/:tab'
        tabs={[
          {
            label: 'Your school',
            children: <YourSchool />,
            path: 'school'
          },
          {
            label: 'Your classes',
            children: <Classes movingClass={movingClass} />,
            path: 'classes'
          },
          {
            label: 'Your account',
            children: <YourAccount />,
            path: 'account'
          }
        ]}
      />
    </Page.Container>
  );
};

export default TeacherDashboard;
