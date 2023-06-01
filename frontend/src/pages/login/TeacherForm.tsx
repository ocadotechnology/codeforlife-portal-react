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
import { SearchParams } from 'codeforlife/lib/esm/helpers';
import Teacher2faBackupForm from './Teacher2faBackupForm';
import Teacher2faForm from './Teacher2faForm';

interface TeacherFormValues {
  email: string;
  password: string;
}

const initialValues: TeacherFormValues = {
  email: '',
  password: ''
};

const TeacherForm: React.FC = () => {
  const loginSteps = ['login2fa', 'backupToken'] as const;
  const params = SearchParams.get<{
    loginStep?: typeof loginSteps[number]
  }>({
    loginStep: {
      validate: SearchParams.validate.inOptions(loginSteps),
      isRequired: false
    }
  });

  let form = <BaseTeacherForm />;
  if (params?.loginStep !== undefined) {
    switch (params.loginStep) {
      case 'login2fa':
        form = <Teacher2faForm />;
        break;
      case 'backupToken':
        form = <Teacher2faBackupForm />;
        break;
    }
  }

  return form;
};

const BaseTeacherForm: React.FC = () => {
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
      <SubmitButton
        stackProps={{ alignItems: 'end' }}
        // TODO: Remove href and replace with submit functionality
        href={paths.login.teacher.login2fa}>
        Log in
      </SubmitButton>
    </BaseForm>
  );
};

export default TeacherForm;
