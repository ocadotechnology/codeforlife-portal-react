import React from 'react';
import {
  Stack,
  MobileStepper,
  mobileStepperClasses,
  Typography
} from '@mui/material';

import BasePage from '../BasePage';
import PageSection from '../../components/PageSection';
import SchoolForm from './SchoolForm';
import ClassForm from './ClassForm';
import StudentsForm from './StudentsForm';
import ClassCredentials from './ClassCredentials';

const TeacherOnboarding: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  function generateKey(step: number): string {
    return `teacher-onboarding-step-${step}`;
  }

  const steps = 4;

  return (
    <BasePage>
      <PageSection>
        <Stack>
          <Typography variant='h5'>
            {[
              'Create a school or club',
              'Create a class',
              'Add students to class',
              'Student login details'
            ][activeStep]}
          </Typography>
          <Typography>
            Progress &lt; {activeStep} of {steps} &gt;
          </Typography>
          <MobileStepper
            variant='progress'
            position='static'
            steps={steps}
            activeStep={activeStep}
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
              nextStep={() => { setActiveStep(1); }}
            />,
            <ClassForm
              key={generateKey(1)}
              nextStep={() => { setActiveStep(2); }}
            />,
            <StudentsForm
              key={generateKey(2)}
              nextStep={() => { setActiveStep(3); }}
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
