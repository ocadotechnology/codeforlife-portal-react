import React from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import { SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import * as Yup from 'yup';
import { Button, Stack, Typography, useTheme } from '@mui/material';

interface Login2faBackupFormValues {
  backupToken: string;
}
const initialValues: Login2faBackupFormValues = {
  backupToken: ''
};

const Teacher2faBackupForm: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header="Welcome"
      subheader=""
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
      }}
    >
      <Typography marginBottom={theme.spacing(6)}>
        Use this form for entering backup tokens for logging in. These tokens
        have been generated for you to print and keep safe. Please enter one of
        these backup tokens to login to your account.
      </Typography>
      <Typography fontWeight="bold">Token:</Typography>
      <TextField
        name="backupToken"
        helperText="Enter one of your tokens"
        validate={Yup.string().matches(/^[a-z0-9]{8}$/, 'Invalid token')}
        required
      />
      <Stack
        marginTop={theme.spacing(3.5)}
        marginBottom={theme.spacing(1)}
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Button
          onClick={() => {
            navigate(paths.login.teacher._);
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <SubmitButton
          // TODO: Remove href and replace with submit functionality
          onClick={() => {
            navigate(paths.teacher.dashboard.school._);
          }}
        />
      </Stack>
    </BaseForm>
  );
};
export default Teacher2faBackupForm;
