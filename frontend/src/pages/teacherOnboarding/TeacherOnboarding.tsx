import React from 'react';
import {
  Stack,
  MobileStepper,
  mobileStepperClasses,
  Typography
} from '@mui/material';

import BasePage from '../BasePage';
import PageSection from '../../components/PageSection';
import PageBanner from '../../components/PageBanner';
import AddStudentsForm from '../../features/addStudentsForm/AddStudentsForm';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';
import ClassCredentials from './ClassCredentials';

const TeacherOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

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
    <BasePage>
      <PageBanner text={{
        title: `Welcome, ${userName}`,
        content: 'Everything you need to start coding with your class is here. Let\'s set you up.'
      }} />
      <PageSection>
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
      </PageSection>
    </BasePage>
  );
};

export default TeacherOnboarding;
