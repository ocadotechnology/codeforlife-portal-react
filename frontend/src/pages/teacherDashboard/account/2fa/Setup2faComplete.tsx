import React from 'react';
import BasePage from '../../../BasePage';
import DashboardBanner from '../../DashboardBanner';
import DashboardHeader from '../../DashboardHeader';
import { Button, Typography } from '@mui/material';
import PageSection from '../../../../components/PageSection';
import { paths } from '../../../../app/router';
const BackupTokens: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your account" />
      <PageSection>
        <Typography align="center" variant="h4">
          Two-factor authentication set up complete
        </Typography>
        <Typography>
          You have successfully set up 2FA. 🎉
        </Typography>
        <Typography>
          You will now need to use your code generator the next time you log in.
        </Typography>
        <Button variant="contained" color="tertiary" href={paths.teacherSchool}>
          OK
        </Button>
      </PageSection>
    </BasePage>
  );
};

export default BackupTokens;
