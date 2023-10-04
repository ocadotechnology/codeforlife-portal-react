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
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={({ authFactors }) => {
        if (authFactors.includes('otp')) {
          return {
            navigateTo: paths.login.teacher.otp._,
            isEnd: false
          };
        }

        return {
          navigateTo: paths.teacher.dashboard.school._,
          isEnd: true
        };
      }}
    >
      <EmailField
        required
        placeholder='Email address'
        helperText='Enter your email address'
      />
      <PasswordField
        placeholder='Password'
        helperText='Enter your password'
        required
      />
      <Stack>
        <Typography
          variant='body2'
          fontWeight='bold'
          my={0}
        >
          Forgotten your password?
        </Typography>
        <Typography variant='body2'>
          Don&apos;t worry, you can&nbsp;
          <Link onClick={() => { navigate(paths.resetPassword.teacher._); }}>
            reset your password
          </Link>
          .
        </Typography>
      </Stack>
      <SubmitButton stackProps={{ alignItems: 'end' }}>
        Log in
      </SubmitButton>
    </LoginForm>
  );
};

export default Credentials;
