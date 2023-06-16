import React from 'react';
import {
  Stack,
  Link,
  Typography
} from '@mui/material';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';

import {
  EmailField,
  TextField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

interface IndependentFormValues {
  email: string;
  password: string;
}

const initialValues: IndependentFormValues = {
  email: '',
  password: ''
};

const IndependentForm: React.FC = (): JSX.Element => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'independent' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={initialValues}
      onSubmit={(values, errors) => {
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      <EmailField
        required
        placeholder="Email address"
        helperText="Enter your email address"
      />
      <TextField
        required
        name="password"
        placeholder="Password"
        helperText="Enter your password"
        type="password"
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
          <Link href={paths.resetPassword.independent._}>
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
          <Link fontWeight='normal' href={paths.login.student._}>
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
