import React from 'react';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import * as Yup from 'yup';

import { getSearchParams } from 'codeforlife/lib/esm/helpers';

import CflTextField from '../../components/formik/CflTextField';
import BaseForm from './BaseForm';

const AccessCodeForm: React.FC<{
  setAccessCode: (accessCode: string) => void
}> = ({ setAccessCode }) => {
  interface Values {
    accessCode: string
  }

  const initialValues: Values = {
    accessCode: ''
  };

  const validationSchema: { [V in keyof Values]: Yup.Schema } = {
    accessCode: Yup
      .string()
      .required()
      .matches(/^[A-Z]{2}[0-9]{3}$/, 'Invalid access code')
  };

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header='Welcome'
      subheader='Please enter your class code.'
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values) => {
        setAccessCode(values.accessCode);
      }}
    >
      {(formik) => <>
        <CflTextField
          name="accessCode"
          placeholder='Access code'
          helperText="Enter your access code"
        />
        <Typography
          variant="body2"
          fontWeight="bold"
          my={0}
        >
          Forgotten your login details? Please check with your teacher.
        </Typography>
        <Stack marginLeft='auto'>
          <Button
            disabled={!(formik.dirty && formik.isValid)}
            endIcon={<ChevronRightIcon />}
            type="submit"
          >
            Next
          </Button>
        </Stack>
      </>}
    </BaseForm>
  );
};

const CredentialsForm: React.FC<{
  accessCode: string
}> = ({ accessCode }) => {
  interface Values {
    username: string;
    password: string;
  }

  const initialValues: Values = {
    username: '',
    password: ''
  };

  const validationSchema: { [V in keyof Values]: Yup.Schema } = {
    username: Yup
      .string()
      .email()
      .required(),
    password: Yup
      .string()
      .required()
  };

  return (
    <BaseForm
      themedBoxProps={{ userType: 'student' }}
      header={`Welcome to class: ${accessCode}`}
      subheader='Please enter your login details.'
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values, errors) => {
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      {(formik) => <>
        <CflTextField
          name="username"
          placeholder="Username"
          helperText="Enter your username"
        />
        <CflTextField
          name="password"
          placeholder="Password"
          helperText="Enter your password"
          type="password"
        />
        <Stack marginLeft="auto">
          <Button
            disabled={!(formik.dirty && formik.isValid)}
            endIcon={<ChevronRightIcon />}
            type="submit"
          >
            Log in
          </Button>
        </Stack>
      </>}
    </BaseForm>
  );
};

interface StudentFormParams {
  accessCode?: string
}

const StudentForm: React.FC = () => {
  const params = getSearchParams({
    accessCode: { cast: String, isRequired: false }
  }) as StudentFormParams;

  const [accessCode, setAccessCode] = React.useState(params.accessCode);

  return (accessCode === undefined)
    ? <AccessCodeForm setAccessCode={setAccessCode} />
    : <CredentialsForm accessCode={accessCode} />;
};

export default StudentForm;
