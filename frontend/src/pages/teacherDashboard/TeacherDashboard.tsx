import React, { useEffect, useState } from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import YourSchool from './YourSchool';
import Classes from './classes/Classes';
import YourAccount from './account/YourAccount';
import { useLazyGetTeacherDashboardQuery } from '../../app/api/endpoints/teacher/dashboard';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../app/router';

const TeacherDashboard: React.FC<{
  tab: number;
  movingClass?: boolean
}> = ({ tab, movingClass = false }) => {
  // TODO: get from API.
  const userName = 'John Doe';
  const [isAdmin, setIsAdmin] = useState(true);
  const [getTeacherDashboard] = useLazyGetTeacherDashboardQuery();
  const navigate = useNavigate();
  useEffect(() => {
    getTeacherDashboard('').unwrap()
      .then((res) => {
        console.log('getTeacherDashboard', res);
        switch (res.redirect) {
          case 'onboarding':
            navigate(paths.teacher.onboarding._);
            break;
        }
        // TODO: pre-fill update_school_form
        console.log('t', JSON.parse(res.teacher));
        console.log('s', JSON.parse(res.school));
        setIsAdmin(res.isAdmin);
      })
      .catch((err) => { console.error(err); });
  }, []);
  return (
    <Page.Container>
      <Page.TabBar
        header={`Welcome back, ${userName}`}
        value={tab}
        originalPath='/teacher/dashboard/:tab'
        tabs={[
          {
            label: 'Your school',
            children: <YourSchool isAdmin={isAdmin} />,
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
