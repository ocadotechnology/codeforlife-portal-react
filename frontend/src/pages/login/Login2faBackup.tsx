import React from 'react';

import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import BaseForm from './BaseForm';
import { SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import * as Yup from 'yup';
import { Button, Stack, Typography } from '@mui/material';

const Login2faBackup: React.FC = () => {
  return (
    <BasePage>
      <PageSection maxWidth='md'>
        <BaseForm
          themedBoxProps={{ userType: 'teacher' }}
          header='Welcome'
          subheader=''
          initialValues={{}}
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
            name="backup token"
            helperText="Enter one of your tokens"
            validate={Yup
              .string()
              .required()
              .matches(/^[a-z0-9]{8}$/, 'Invalid token')}
            required
          />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained" color="tertiary" href={paths.login.teacher}>
              Cancel
            </Button>
            <SubmitButton
              // TODO: Remove href and replace with submit functionality
              href={paths.teacherSchool}>
              Submit
            </SubmitButton>
          </Stack>
        </BaseForm>
      </PageSection>
    </BasePage>
  );
};

export default Login2faBackup;
