import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Stack, Typography } from '@mui/material';
import { paths } from '../../../../../../app/router';
import NewStudentsTable from '../../../../../../features/newStudentsTable/NewStudentsTable';
import { Check as CheckIcon } from '@mui/icons-material';

const ResetStudent: React.FC = (): JSX.Element => {
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
    <Page.Section>
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
    </Page.Section>
  </>;
};

export default ResetStudent;
