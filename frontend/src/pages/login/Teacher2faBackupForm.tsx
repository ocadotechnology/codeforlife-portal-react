import React from 'react';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import { SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import * as Yup from 'yup';
import { Button, Stack, Typography } from '@mui/material';

interface Login2faBackupFormValues {
  backupToken: string;
}

const initialValues: Login2faBackupFormValues = {
  backupToken: ''
};

const Teacher2faBackupForm: React.FC = () => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader=''
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
      }}
    >
      <Typography>
        Use this form for entering backup tokens for logging in. These tokens have been generated for you to print
        and keep safe. Please enter one of these backup tokens to login to your account.
      </Typography>
      <Typography fontWeight="bold">
        Token:
      </Typography>
      <TextField
        name="backupToken"
        helperText="Enter one of your tokens"
        validate={Yup
          .string()
          .matches(/^[a-z0-9]{8}$/, 'Invalid token')}
        required
      />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button href={paths.login.teacher._}>
          Cancel
        </Button>
        <SubmitButton
          // TODO: Remove href and replace with submit functionality
          href={paths.teacherSchool}/>
      </Stack>
    </BaseForm>
  );
};

export default Teacher2faBackupForm;
