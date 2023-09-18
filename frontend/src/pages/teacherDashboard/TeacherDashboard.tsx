import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import YourSchool from './YourSchool';
import Classes, { MoveClasses } from './classes/Classes';
import YourAccount from './account/YourAccount';
import { useGetTeacherDataQuery } from '../../app/api/teacher/dashboard';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../app/router';

const TeacherDashboard: React.FC<{
  tab: number;
  movingClass?: boolean;
}> = ({ tab, movingClass = false }) => {
  const { data, error, isLoading } = useGetTeacherDataQuery();
  const navigate = useNavigate();

  if (data && !data.school) {
    navigate(paths.teacher.onboarding._);
  }

  return <>
    {error
      ? (<>There was an error</>)
      : (!isLoading && data)
        ? (
          <Page.Container>
            <Page.TabBar
              header={`Welcome back, ${data.teacher.teacherFirstName as string} ${data.teacher.teacherLastName as string}`}
              value={tab}
              originalPath='/teacher/dashboard/:tab'
              tabs={[
                {
                  label: 'Your school',
                  children: <YourSchool data={data} />,
                  path: 'school'
                },
                {
                  label: 'Your classes',
                  children: movingClass ? <MoveClasses /> : <Classes data={data} />,
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
        )
        : null
    }
  </>;
};

export default TeacherDashboard;
