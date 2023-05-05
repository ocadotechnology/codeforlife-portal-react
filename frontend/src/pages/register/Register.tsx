import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import BasePage from '../../pages/BasePage';
import PageSection from 'components/PageSection';
import TeacherRegister from './TeacherRegister';
import IndepRegister from './IndepRegister';

const Register: React.FC = () => {
  return (
    <BasePage>
      <PageSection>
        <Grid container xs={12}>
          <Grid xs={12} md={5.5} marginX={{ xs: 1, md: 'auto' }} marginBottom={{ xs: 2, md: 'auto' }} bgcolor='#ee0857'>
            <TeacherRegister />
          </Grid>
          <Grid xs={12} md={5.5} marginX={{ xs: 1, md: 'auto' }} marginBottom='auto' bgcolor='#ffc709'>
            <IndepRegister />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default Register;
