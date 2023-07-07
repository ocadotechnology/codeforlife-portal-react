import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
        onClick={() => { navigate(paths.teacher.dashboard.school._); }}
      >
        Complete setup
      </Button>
    </Stack>
  </>;
};

export default ClassCredentials;
