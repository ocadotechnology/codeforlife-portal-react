import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import YourSchool from './YourSchool';
import Classes from './classes/Classes';
import YourAccount from './account/YourAccount';

const TeacherDashboard: React.FC = () => {
  // TODO: get from API.
  const userName = 'John Doe';

  return (
    <Page.Container>
      <Page.TabBar
        header={`Welcome back, ${userName}`}
        tabs={[
          {
            label: 'Your school',
            children: <YourSchool />
          },
          {
            label: 'Your classes',
            children: <Classes />
          },
          {
            label: 'Your account',
            children: <YourAccount />
          }
        ]}
      />
    </Page.Container>
  );
};

export default TeacherDashboard;
