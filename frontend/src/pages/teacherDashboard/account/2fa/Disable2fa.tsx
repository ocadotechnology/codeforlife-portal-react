import React from 'react';
import BasePage from '../../../BasePage';
import DashboardBanner from '../../DashboardBanner';
import DashboardHeader from '../../DashboardHeader';
import { Button, Link, Typography } from '@mui/material';
import PageSection from '../../../../components/PageSection';
import { paths } from '../../../../app/router';

const Disable2fa: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your account" />
      <PageSection>
        <Typography align="center" variant="h4">
          Disable Two-factor Authentication
        </Typography>
        <Link href={paths.teacherAccount} color="inherit" className="body">
          &lt; Back to Your account
        </Link>
        <Typography>
          You can disable your two-factor authentication below.
        </Typography>
        <Button
          variant="contained"
          color="error"
          // TODO: to call backend and show confirmation popup
          type="submit">
          Disable 2FA
        </Button>
      </PageSection>
    </BasePage>
  );
};

export default Disable2fa;
