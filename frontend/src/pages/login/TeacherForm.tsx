import React from 'react';
import {
  Stack,
  Link,
  Typography,
  Button
} from '@mui/material';
import * as Yup from 'yup';

import { paths } from '../../app/router';
import CflTextField from '../../components/formik/CflTextField';
import BaseForm from './BaseForm';

interface TeacherFormValues {
  username: string;
  password: string;
}

const initialValues: TeacherFormValues = {
  username: '',
  password: ''
};

const validationSchema: { [V in keyof TeacherFormValues]: Yup.Schema } = {
  username: Yup
    .string()
    .email()
    .required('Email address is required'),
  password: Yup
    .string()
    .required('Password is required')
};

const TeacherForm: React.FC = (): JSX.Element => {
  return (
    <BaseForm
      themedBoxProps={{ userType: 'teacher' }}
      header='Welcome'
      subheader='Please enter your login details.'
      initialValues={initialValues}
      validationSchema={Yup.object(validationSchema)}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
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

export default TeacherForm;
