import {
  MobileStepper,
  Stack,
  Typography,
  mobileStepperClasses
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

import Page from 'codeforlife/lib/esm/components/page';
import { getSession } from 'codeforlife/lib/esm/helpers/jsCookie';
import { BulkCreateResult } from 'codeforlife/lib/esm/helpers/rtkQuery';

import { User, useRetrieveUserQuery } from '../../app/api';
import AddStudentsForm from '../../features/addStudentsForm/AddStudentsForm';
import ClassCredentials from './ClassCredentials';
import ClassForm from './ClassForm';
import SchoolForm from './SchoolForm';

const TeacherOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState<{
    index: number;
    schoolId?: number;
    classAccessCode?: string;
    users?: BulkCreateResult<User>;
  }>({ index: 0 });
  const location = useLocation();

  const session = getSession();
  const user = session === undefined
    ? undefined
    : useRetrieveUserQuery({ id: session?.userId });

  function generateKey(step: number): string {
    return `teacher-onboarding-step-${step}`;
  }

  function onSubmit(state: Omit<typeof activeStep, 'index'>): void {
    setActiveStep((previousState) => ({
      index: previousState.index + 1,
      ...state
    }));
  }

  const steps = 4;

  return (
    <Page.Container>
      {user?.data !== undefined && <>
        <Page.Banner
          header={`Welcome, ${user.data.firstName} ${user.data.lastName}`}
          subheader={'Everything you need to start coding with your class is here. Let\'s set you up.'}
        />
        {location.state?.leftOrganisation &&
          <Page.Notification>
            You have successfully left the school or club.
          </Page.Notification>
        }
        <Page.Section>
          <Stack>
            <Typography variant='h4'>
              {[
                'Create a school or club',
                'Create a class',
                'Add students to class',
                'Student login details'
              ][activeStep.index]}
            </Typography>
            <Typography>
              Progress &lt; {activeStep.index + 1} of {steps} &gt;
            </Typography>
            <MobileStepper
              variant='progress'
              position='static'
              steps={steps + 1}
              activeStep={activeStep.index + 1}
              nextButton={undefined}
              backButton={undefined}
              sx={{
                padding: 0,
                marginBottom: 3,
                [`.${mobileStepperClasses.progress}`]: {
                  width: '100%',
                  height: '7px'
                }
              }}
            />
            {[
              <SchoolForm
                key={generateKey(0)}
                onSubmit={({ id }) => { onSubmit({ schoolId: id }); }}
              />,
              <ClassForm
                key={generateKey(1)}
                teacherId={session?.userId as number}
                schoolId={activeStep.schoolId as number}
                onSubmit={({ accessCode }) => {
                  onSubmit({ classAccessCode: accessCode });
                }}
              />,
              <AddStudentsForm
                key={generateKey(2)}
                // classId={activeStep.classId as number}
                onSubmit={(users) => { onSubmit({ users }); }}
              />,
              <ClassCredentials
                key={generateKey(3)}
                accessCode={activeStep.classAccessCode as string}
                users={activeStep.users as BulkCreateResult<User>}
              />
            ][activeStep.index]}
          </Stack>
        </Page.Section>
      </>}
    </Page.Container>
  );
};

export default TeacherOnboarding;
