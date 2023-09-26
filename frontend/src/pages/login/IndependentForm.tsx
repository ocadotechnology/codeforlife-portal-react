import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Link,
  Typography
} from '@mui/material';

import {
  EmailField,
  PasswordField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';

import { useLoginMutation } from '../../app/api';
import { paths } from '../../app/router';
import BaseForm from './BaseForm';

const IndependentForm: React.FC = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  return (
    <BaseForm
      themedBoxProps={{ userType: 'independent' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={submitForm(login, {
        then: () => { navigate(paths.student.dashboard.independent._); }
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
          <Link onClick={() => { navigate(paths.resetPassword.independent._); }}>
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
          <Link fontWeight='normal' onClick={() => { navigate(paths.login.student._); }}>
            Log in here
          </Link>
        </Typography>
      </Stack>
      <SubmitButton stackProps={{ alignItems: 'end' }}>
        Log in
      </SubmitButton>
    </BaseForm>
  );
};

export default IndependentForm;
