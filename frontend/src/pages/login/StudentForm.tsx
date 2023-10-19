import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';
import {
  generatePath,
  useNavigate,
  useParams
} from 'react-router-dom';
import * as Yup from 'yup';

import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { accessCodeSchema } from '../../app/schemas';
import BaseForm from './BaseForm';

import {
  PasswordField,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';

import { useLoginMutation } from '../../app/api';
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
  const [login] = useLoginMutation();

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header={`Welcome to class: ${accessCode}`}
      subheader="Please enter your login details."
      initialValues={{
        username: '',
        password: '',
        classId: accessCode
      }}
      onSubmit={submitForm(login, {
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
  const [login] = useLoginMutation();

  const searchParams = tryValidateSync(
    fromSearchParams(),
    Yup.object({
      userId: Yup.number().required(),
      loginId: Yup.string().required()
    })
  );

  const accessCode = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  )?.accessCode;

  if (searchParams !== undefined) {
    login(searchParams)
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
