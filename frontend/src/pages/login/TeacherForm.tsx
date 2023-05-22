import React from 'react';
import {
  Stack,
  Link,
  Typography
} from '@mui/material';
import * as Yup from 'yup';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';

import {
  EmailField,
  TextField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

interface TeacherFormValues {
  email: string;
  password: string;
}

const initialValues: TeacherFormValues = {
  email: '',
  password: ''
};

const TeacherForm: React.FC = (): JSX.Element => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
      }}
    >
      <EmailField
        required
        placeholder="Email address"
        helperText="Enter your email address"
      />
      <TextField
        name="password"
        placeholder="Password"
        helperText="Enter your password"
        type="password"
        validate={Yup.string()}
        required
      />
      <Stack>
        <Typography
          variant="body2"
          fontWeight="bold"
          my={0}
        >
          Forgotten your password?
        </Typography>
        <Typography variant="body2">
          Don&apos;t worry, you can&nbsp;
          <Link
            className='body'
            href={paths.resetPassword.teacher}
          >
            reset your password
          </Link>
          .
        </Typography>
      </Stack>
      <SubmitButton stackProps={{ alignItems: 'end' }}>
        Log in
      </SubmitButton>
    </BaseForm>
  );
};

export default TeacherForm;
