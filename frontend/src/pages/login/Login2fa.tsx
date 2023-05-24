import React from 'react';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import BaseForm from './BaseForm';
import { SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import * as Yup from 'yup';
import { paths } from '../../app/router';
import { Button, Stack } from '@mui/material';

const TeacherForm2fa: React.FC = (): JSX.Element => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader='Please enter the token generated by your token generator.'
      initialValues={{}}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
      }}
    >
      <TextField
        name="token"
        helperText="Enter your code from your app"
        validate={Yup
          .string()
          .required()
          .matches(/^[0-9]{6}$/, 'Invalid token')}
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
  );
};

const Login: React.FC = () => {
  return (
    <BasePage>
      <PageSection maxWidth='md'>
        <TeacherForm2fa />
      </PageSection>
    </BasePage>
  );
};

export default Login;
