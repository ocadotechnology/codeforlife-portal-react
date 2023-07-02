import React from 'react';
import {
  Stack,
  Button
} from '@mui/material';
import {
  Check as CheckIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';
import NewStudentsTable from '../../features/newStudentsTable/NewStudentsTable';

const ClassCredentials: React.FC = () => {
  // TODO: get from API.
  const classLink = 'https://www.codeforlife.education/';
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
    <NewStudentsTable
      classLink={classLink}
      students={students}
    />
    <Stack alignItems='end'>
      <Button
        endIcon={<CheckIcon />}
        variant="outlined"
        href={paths.teacher.dashboard.school._}
      >
        Complete setup
      </Button>
    </Stack>
  </>;
};

export default ClassCredentials;
