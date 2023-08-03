import React from 'react';
import {
  Stack,
  Link,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import {
  EmailField,
  PasswordField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';

import { paths } from '../../app/router';
import { useLoginTeacherMutation } from '../../app/api';
import BaseForm from './BaseForm';
import Teacher2faBackupForm from './Teacher2faBackupForm';
import Teacher2faForm from './Teacher2faForm';

const TeacherForm: React.FC = () => {
  const params = tryValidateSync(
    useParams(),
    yup.object({
      view: yup.string()
        .oneOf([
          '2fa',
          'backup-token'
        ] as const)
    })
  );

  let form = <BaseTeacherForm />;
  if (params?.view !== undefined) {
    switch (params.view) {
      case '2fa':
        form = <Teacher2faForm />;
        break;
      case 'backup-token':
        form = <Teacher2faBackupForm />;
        break;
    }
  }

  return form;
};

const BaseTeacherForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginTeacher] = useLoginTeacherMutation();

  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={{
        'auth-username': '',
        'auth-password': '',
        currentStep: 'auth' as const
      }}
      onSubmit={submitForm(loginTeacher, {
        // TODO: navigate(paths.login.teacher.twoFA._);
        then: () => { navigate(paths.teacher.dashboard.school._); }
      })}
    >
      <EmailField
        required
        name='auth-username'
        placeholder="Email address"
        helperText="Enter your email address"
      />
      <PasswordField
        name='auth-password'
        placeholder="Password"
        helperText="Enter your password"
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
          <Link onClick={() => { navigate(paths.resetPassword.teacher._); }}>
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
