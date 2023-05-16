import React from 'react';
import {
  Stack,
  Button,
  Link,
  Typography
} from '@mui/material';
import * as Yup from 'yup';

import { paths } from '../../app/router';
import CflTextField from '../../components/formik/CflTextField';
import BaseForm from './BaseForm';

interface IndependentFormValues {
  username: string;
  password: string;
}

const initialValues: IndependentFormValues = {
  username: '',
  password: ''
};

const validationSchema: { [V in keyof IndependentFormValues]: Yup.Schema } = {
  username: Yup
    .string()
    .email()
    .required(),
  password: Yup
    .string()
    .required()
};

const IndependentForm: React.FC = (): JSX.Element => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'independent' }}
      header='Welcome'
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
          placeholder="Email address"
          helperText="Enter your email address"
          type='email'
        />
        <CflTextField
          name="password"
          placeholder="Password"
          helperText="Enter your password"
          type="password"
        />
        <Stack>
          <Typography
            variant="body2"
            fontWeight="bold"
            mb={0}
          >
            Forgotten your password?
          </Typography>
          <Typography variant="body2">
            Don&apos;t worry, you can&nbsp;
            <Link
              className='body'
              href={paths.resetPassword.independent}
            >
              reset your password
            </Link>
            .
          </Typography>
        </Stack>
        <Stack direction='row'>
          <Typography
            variant="body2"
            fontWeight="bold"
            my={0}
          >
            Part of a school or club?&nbsp;
          </Typography>
          <Link
            className='body'
            variant="body2"
            href={paths.login.student}
          >
            Log in here
          </Link>
        </Stack>
        <Stack marginLeft="auto">
          <Button
            disabled={!(formik.dirty && formik.isValid)}
            type="submit"
          >
            Log in
          </Button>
        </Stack>
      </>}
    </BaseForm>
  );
};

export default IndependentForm;
