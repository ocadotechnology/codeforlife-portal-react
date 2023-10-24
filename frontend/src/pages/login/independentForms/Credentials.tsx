import {
  Link,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  EmailField,
  PasswordField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

import { paths } from '../../../app/router';
import LoginForm from '../LoginForm';

const Credentials: React.FC = () => {
  const navigate = useNavigate();

  return (
    <LoginForm
      themedBoxProps={{ userType: 'independent' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={() => ({
        navigateTo: paths.student.dashboard.independent._,
        isEnd: true
      })}
    >
      <EmailField
        required
        placeholder="Email address"
        helperText="Enter your email address"
      />
      <PasswordField
        required
        placeholder="Password"
        helperText="Enter your password"
      />
      <Stack>
        <Typography
          variant="body2"
          fontWeight="bold"
          mb={0}
        >
          Forgotten your password?
        </Typography>
        <Typography variant="body2">
          Don&apos;t worry, you can&nbsp;
          <Link onClick={() => {
            navigate(paths.resetPassword.independent._);
          }}>
            reset your password
          </Link>
          .
        </Typography>
      </Stack>
      <Stack direction='row'>
        <Typography
          variant="body2"
          fontWeight="bold"
          my={0}
        >
          Part of a school or club?&nbsp;
          <Link
            fontWeight='normal'
            onClick={() => { navigate(paths.login.student._); }}
          >
            Log in here
          </Link>
        </Typography>
      </Stack>
      <SubmitButton stackProps={{ alignItems: 'end' }}>
        Log in
      </SubmitButton>
    </LoginForm>
  );
};

export default Credentials;
