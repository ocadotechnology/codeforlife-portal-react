import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TeacherForm from './TeacherForm';
import IndependentForm from './IndependentForm';

const Register: React.FC = () => {
  // TODO: Check if the user is already logged in. If yes, then redirect the
  //  user to their respective dashboard page. Maybe also display a notification
  //  page saying something like: "You're already logged in"?

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
