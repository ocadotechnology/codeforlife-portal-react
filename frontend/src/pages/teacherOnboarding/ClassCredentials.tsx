import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Stack,
  Button
} from '@mui/material';
import {
  Check as CheckIcon, ChevronLeftOutlined
} from '@mui/icons-material';

import { paths } from '../../app/router';
import NewStudentsTable from '../../features/newStudentsTable/NewStudentsTable';
import { ResetStudentPasswordResponseProps } from '../../app/api/teacher/teach';
const ClassCredentials: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const studentData = location.state as { updatedStudentCredentials: ResetStudentPasswordResponseProps; };
  let buttonText = 'Complete setup';
  let name = 'John';
  let password = 'very_good_password';
  let classLink = 'https://www.codeforlife.education/';
  let directLoginLink = 'https://www.codeforlife.education/';
  let alignItems = 'end';
  let startIcon = <></>;
  let endIcon = <CheckIcon />;
  let path = paths.teacher.dashboard.school._;
  // TODO: Once the onboarding is implemented, we can remove this if statement.
  // as well as re-defined variables above. We can just fetch the data from the useLocation hook.
  if (studentData) {
    const { studentsInfo } = studentData.updatedStudentCredentials;
    name = studentsInfo[0].name;
    password = studentsInfo[0].password;
    classLink = studentData.updatedStudentCredentials.classUrl;
    directLoginLink = studentsInfo[0].loginUrl;
    alignItems = 'start';
    startIcon = <ChevronLeftOutlined />;
    endIcon = <></>;
    path = paths.teacher.dashboard.classes._;
    buttonText = 'Back to class';
  }

  // TODO: get from API.
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
