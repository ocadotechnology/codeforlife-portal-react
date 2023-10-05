import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Stack,
  Button
} from '@mui/material';
import {
  Check as CheckIcon, ChevronLeftOutlined
} from '@mui/icons-material';
// TODO: These variables are defined while we don't have the onboarding implemented.
// Once we have the onboarding implemented, we can remove these variables and fetch the data
// TODO: Once the onboarding is implemented, we can remove this if statement.
// as well as re-defined variables above. We can just fetch the data from the useLocation hook.
import { paths } from '../../app/router';
import NewStudentsTable from '../../features/newStudentsTable/NewStudentsTable';

const ClassCredentials: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location?.state;

  const isStudentDataPresent = Boolean(studentData);
  const { studentsInfo } = studentData?.updatedStudentCredentials || {};

  const name = isStudentDataPresent ? studentsInfo[0].name : 'John';
  const password = isStudentDataPresent ? studentsInfo[0].password : 'very_good_password';
  const classLink = isStudentDataPresent ? studentData.updatedStudentCredentials.classUrl : 'https://www.codeforlife.education/';
  const directLoginLink = isStudentDataPresent ? studentsInfo[0].loginUrl : 'https://www.codeforlife.education/';
  const alignItems = isStudentDataPresent ? 'start' : 'end';
  const startIcon = isStudentDataPresent ? <ChevronLeftOutlined /> : <></>;
  const endIcon = isStudentDataPresent ? <></> : <CheckIcon />;
  const path = isStudentDataPresent ? paths.teacher.dashboard.classes._ : paths.teacher.dashboard.school._;
  const buttonText = isStudentDataPresent ? 'Back to class' : 'Complete setup';

  const students: Array<{
    name: string;
    password: string;
    link: string;
  }> = ([
    {
      name,
      password,
      link: directLoginLink
    }
  ]);

  return <>
    <NewStudentsTable
      classLink={classLink}
      students={students}
    />
    <Stack alignItems={alignItems}>
      <Button
        endIcon={endIcon}
        startIcon={startIcon}
        variant="outlined"
        onClick={() => { navigate(path); }}
      >
        {buttonText}
      </Button>
    </Stack>
  </>;
};

export default ClassCredentials;
