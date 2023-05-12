import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography
} from '@mui/material';

import { getSearchParams } from 'codeforlife/lib/esm/helpers';

import BasePage from 'pages/BasePage';
import { paths } from 'app/router';
import ThemedBox, { ThemedBoxProps } from 'components/ThemedBox';
import PageSection from 'components/PageSection';
import TeacherForm from './TeacherForm';
import StudentForm from './StudentForm';
import IndependentForm from './IndependentForm';

enum UserType {
  Teacher = 'teacher',
  Student = 'student',
  Independent = 'independent'
}

interface LoginParams {
  userType: UserType
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  let params = getSearchParams({
    userType: String
  }) as LoginParams | null;

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;
  else if (!Object.values(UserType).includes(params.userType)) {
    params = null;
    return <></>;
  }

  let bgcolor: ThemedBoxProps['bgcolor'];
  let subheader: string;
  let form: React.ReactElement;
  switch (params.userType) {
    case UserType.Teacher:
      bgcolor = 'primary';
      subheader = 'Please enter your login details.';
      form = <TeacherForm />;
      break;
    case UserType.Student:
      bgcolor = 'secondary';
      subheader = 'Please enter your class code.';
      form = <StudentForm />;
      break;
    case UserType.Independent:
      bgcolor = 'tertiary';
      subheader = 'Please enter your login details.';
      form = <IndependentForm />;
      break;
  }

  return (
    <BasePage>
      <PageSection maxWidth='md'>
        <ThemedBox withIcons bgcolor={bgcolor}>
          <Stack>
            <Typography align="center" variant="h4">
              Welcome
            </Typography>
            <Typography align="center" variant="h5">
              {subheader}
            </Typography>
            {form}
          </Stack>
        </ThemedBox>
      </PageSection>
    </BasePage>
  );
};

export default Login;
