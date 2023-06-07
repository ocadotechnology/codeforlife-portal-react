import React from 'react';
import BasePage from '../../../BasePage';
import DashboardBanner from '../../DashboardBanner';
import DashboardHeader from '../../DashboardHeader';
import { Button, Stack, Typography } from '@mui/material';
import PageSection from '../../../../components/PageSection';
import { paths } from '../../../../app/router';
import NewStudentsTable from '../../../../features/newStudentsTable/NewStudentsTable';
import { Check as CheckIcon } from '@mui/icons-material';

const Reset: React.FC = (): JSX.Element => {
  // TODO: get from API.
  const classLink = 'https://www.codeforlife.education/';
  const currentClassName = 'Awesome Class (AW123)';
  const students: Array<{
    name: string;
    password: string;
    link: string;
  }> = ([
    {
      name: 'John',
      password: 'ioykms',
      link: 'https://www.codeforlife.education/'
    }
  ]);

  return <>
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page='Your classes' />
      <PageSection>
        <Typography variant='h5'>
          Students&apos; passwords reset for class {currentClassName}
        </Typography>
        <NewStudentsTable
          classLink={classLink}
          students={students}
        />
        <Stack alignItems='end'>
          {/* TODO: fix button style variant */}
          <Button
            endIcon={<CheckIcon />}
            href={paths.teacher.dashboard.school._}
          >
            Complete setup
          </Button>
        </Stack>
      </PageSection>
    </BasePage>
  </>;
};

export default Reset;
