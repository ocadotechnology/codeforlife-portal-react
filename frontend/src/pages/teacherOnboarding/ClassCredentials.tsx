import {
  Check as CheckIcon
} from '@mui/icons-material';
import {
  Button,
  Stack
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../app/router';
import NewStudentsTable, { NewStudentsTableProps } from '../../features/newStudentsTable/NewStudentsTable';

export interface ClassCredentialsProps extends NewStudentsTableProps { }

const ClassCredentials: React.FC<ClassCredentialsProps> = ({
  ...newStudentsTableProps
}) => {
  const navigate = useNavigate();

  return <>
    <NewStudentsTable {...newStudentsTableProps} />
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
