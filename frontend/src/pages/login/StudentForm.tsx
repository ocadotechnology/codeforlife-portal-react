import React from 'react';
import {
  useNavigate,
  useParams,
  generatePath
} from 'react-router-dom';
import { Typography } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import * as Yup from 'yup';

import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { accessCodeSchema } from '../../app/schemas';
import BaseForm from './BaseForm';

import {
  SubmitButton,
  TextField,
  PasswordField
} from 'codeforlife/lib/esm/components/form';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';

import {
  useLoginDependentStudentMutation,
  useLoginDependentStudentDirectlyMutation
} from '../../app/api';
import { paths } from '../../app/router';

const AccessCodeForm: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header="Welcome"
      subheader="Please enter your class code."
      initialValues={{ accessCode: '' }}
      onSubmit={({ accessCode }) => {
        navigate(generatePath(
          paths.login.student.class._,
          { accessCode }
        ));
      }}
    >
      <TextField
        name="accessCode"
        placeholder="Access code"
        helperText="Enter your access code"
        validate={accessCodeSchema}
        required
      />
      <Typography variant="body2" fontWeight="bold">
        Forgotten your login details? Please check with your teacher.
      </Typography>
      <SubmitButton
        stackProps={{ alignItems: 'end' }}
        endIcon={<ChevronRightIcon />}
      >
        Next
      </SubmitButton>
    </BaseForm>
  );
};

const CredentialsForm: React.FC<{
  accessCode: string;
}> = ({ accessCode }) => {
  const navigate = useNavigate();
  const [loginDependentStudent] = useLoginDependentStudentMutation();

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header={`Welcome to class: ${accessCode}`}
      subheader="Please enter your login details."
      initialValues={{
        username: '',
        password: '',
        accessCode
      }}
      onSubmit={submitForm(loginDependentStudent, {
        then: () => { navigate(paths.student.dashboard.dependent._); }
      })}
    >
      <TextField
        name="username"
        placeholder="Username"
        helperText="Enter your username"
        required
      />
      <PasswordField
        placeholder="Password"
        helperText="Enter your password"
        required
      />
      <SubmitButton
        stackProps={{ alignItems: 'end' }}
        endIcon={<ChevronRightIcon />}
      >
        Log in
      </SubmitButton>
    </BaseForm>
  );
};

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const [loginDependentStudentDirectly] =
    useLoginDependentStudentDirectlyMutation();

  const searchParams = tryValidateSync(
    fromSearchParams(),
    Yup.object({
      userId: Yup.string().required(),
      loginId: Yup.string().required()
    })
  );

  const accessCode = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  )?.accessCode;

  if (searchParams !== undefined) {
    loginDependentStudentDirectly(searchParams)
      .unwrap()
      .then(() => { navigate(paths.student.dashboard.dependent._); })
      .catch(() => {
        alert(
          'Failed to automatically log in student. Please log in manually.'
        );
      });
  }

  return accessCode === undefined
    ? <AccessCodeForm />
    : <CredentialsForm accessCode={accessCode} />;
};

export default StudentForm;
