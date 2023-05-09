import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import TeacherForm from './TeacherForm';
import IndependentForm from './IndependentForm';

const Register: React.FC = () => {
  return (
    <BasePage>
      <PageSection>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <TeacherForm />
          </Grid>
          <Grid xs={12} md={6}>
            <IndependentForm />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default Register;
