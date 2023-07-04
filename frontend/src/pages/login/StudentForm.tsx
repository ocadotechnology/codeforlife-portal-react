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
  EmailField
} from 'codeforlife/lib/esm/components/form';

import { paths } from '../../app/router';

const AccessCodeForm: React.FC = () => {
  const navigate = useNavigate();

  interface Values {
    accessCode: string;
  }

  const initialValues: Values = {
    accessCode: ''
  };

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header="Welcome"
      subheader="Please enter your class code."
      initialValues={initialValues}
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
  interface Values {
    email: string;
    password: string;
  }

  const initialValues: Values = {
    email: '',
    password: ''
  };

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header={`Welcome to class: ${accessCode}`}
      subheader="Please enter your login details."
      initialValues={initialValues}
      onSubmit={(values, errors) => {
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      <EmailField
        placeholder="Username"
        helperText="Enter your username"
        required
      />
      <TextField
        name="password"
        placeholder="Password"
        helperText="Enter your password"
        type="password"
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
  const accessCode = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema })
  )?.accessCode;

  return accessCode === undefined
    ? <AccessCodeForm />
    : <CredentialsForm accessCode={accessCode} />;
};

export default StudentForm;
