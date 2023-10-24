import {
  Button,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';

import { paths } from '../../../app/router';
import LoginForm from '../LoginForm';

const OtpBypassToken: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <LoginForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Login as a teacher'
      initialValues={{ token: '' }}
      authFactors={{
        includes: 'otp',
        pathToFirstStep: paths.login.teacher._
      }}
      onSubmit={() => ({
        navigateTo: paths.teacher.dashboard.school._,
        isEnd: true
      })}
    >
      <Typography marginBottom={theme.spacing(6)}>
        Use this form for entering backup tokens for logging in. These tokens
        have been generated for you to print and keep safe. Please enter one
        of these backup tokens to login to your account.
      </Typography>
      <Typography fontWeight='bold'>
        Token:
      </Typography>
      <TextField
        name='token'
        helperText='Enter one of your tokens'
        validate={Yup.string().matches(/^[a-z0-9]{8}$/, 'Invalid token')}
        required
      />
      <Stack
        marginTop={theme.spacing(3.5)}
        marginBottom={theme.spacing(1)}
        direction='row'
        spacing={2}
        justifyContent='space-between'
      >
        <Button
          onClick={() => { navigate(paths.login.teacher._); }}
          variant='outlined'
        >
          Cancel
        </Button>
        <SubmitButton />
      </Stack>
    </LoginForm>
  );
};
export default OtpBypassToken;
