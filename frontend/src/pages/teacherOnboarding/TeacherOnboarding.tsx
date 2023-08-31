import React from 'react';
import {
  Stack,
  MobileStepper,
  mobileStepperClasses,
  Typography
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import AddStudentsForm from '../../features/addStudentsForm/AddStudentsForm';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';
import ClassCredentials from './ClassCredentials';
import { useLocation } from 'react-router-dom';

const TeacherOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const location = useLocation();
  // TODO: check if user has completed onboarding.
  const userName = 'Stefan Kairinos';

  function generateKey(step: number): string {
    return `teacher-onboarding-step-${step}`;
  }

  function onSubmit(): void {
    setActiveStep(activeStep + 1);
  }

  const steps = 4;

  return (
    <Page.Container>
      <Page.Banner
        header={`Welcome, ${userName}`}
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
            ][activeStep]}
          </Typography>
          <Typography>
            Progress &lt; {activeStep + 1} of {steps} &gt;
          </Typography>
          <MobileStepper
            variant='progress'
            position='static'
            steps={steps + 1}
            activeStep={activeStep + 1}
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
              onSubmit={onSubmit}
            />,
            <ClassForm
              key={generateKey(1)}
              onSubmit={onSubmit}
            />,
            <AddStudentsForm
              key={generateKey(2)}
              onSubmit={onSubmit}
            />,
            <ClassCredentials
              key={generateKey(3)}
            />
          ][activeStep]}
        </Stack>
      </Page.Section>
    </Page.Container>
  );
};

export default TeacherOnboarding;
