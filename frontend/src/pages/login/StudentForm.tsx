import React from 'react';
import { Typography } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import * as Yup from 'yup';

import { SearchParams } from 'codeforlife/lib/esm/helpers';

import BaseForm from './BaseForm';

import {
  SubmitButton,
  TextField,
  EmailField
} from 'codeforlife/lib/esm/components/form';

export const validateAccessCode = Yup.string()
  .required()
  .matches(/^[A-Z]{2}[0-9]{3}$/, 'Invalid access code');

const AccessCodeForm: React.FC<{
  setAccessCode: (accessCode: string) => void;
}> = ({ setAccessCode }) => {
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
      onSubmit={(values) => {
        setAccessCode(values.accessCode);
      }}
    >
      <TextField
        name="accessCode"
        placeholder="Access code"
        helperText="Enter your access code"
        validate={validateAccessCode}
      />
      <Typography variant="body2" fontWeight="bold" my={0}>
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
  const params = SearchParams.get<{
    accessCode?: string;
  }>({
    accessCode: {
      isRequired: false,
      validate: SearchParams.validate.matchesSchema(validateAccessCode)
    }
  });

  const [accessCode, setAccessCode] = React.useState(params?.accessCode);

  return accessCode === undefined ? (
    <AccessCodeForm setAccessCode={setAccessCode} />
  ) : (
    <CredentialsForm accessCode={accessCode} />
  );
};

export default StudentForm;
