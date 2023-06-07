import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TeacherForm from './TeacherForm';
import IndependentForm from './IndependentForm';

const Register: React.FC = () => {
  return (
    <Page.Container>
      <Page.Section>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <TeacherForm />
          </Grid>
          <Grid xs={12} md={6}>
            <IndependentForm />
          </Grid>
        </Grid>
      </Page.Section>
    </Page.Container>
  );
};

export default Register;
