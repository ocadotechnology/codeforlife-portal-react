import React from 'react';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ACCESS_CODE_LOGIN_INITIAL_VALUES } from './constants';
import { AccessCodeLoginSchema } from './schemas';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import BaseForm from './BaseForm';
import BasePage from 'pages/BasePage';
import { paths } from 'app/router';

const getStudentUrl = (): string => {
  // TODO: find out how we can create a dynamic url
  // so this horrible function can be removed
  const studentUrlSplit = paths.login.student.split('/');
  studentUrlSplit.pop();
  const studentUrlPrefix = studentUrlSplit.join('/');
  return studentUrlPrefix;
};

const AccessCodeLoginForm: React.FC = (): JSX.Element => {
  const studentUrlPrefix: string = getStudentUrl();
  return (
    <Formik
      initialValues={ACCESS_CODE_LOGIN_INITIAL_VALUES}
      validationSchema={AccessCodeLoginSchema}
      onSubmit={async (values, errors) => {
        console.log(errors);
        const validate = await errors.validateForm();
        const val = await AccessCodeLoginSchema.validate(values);
        console.log(val);
        console.log(validate);
        // TODO: Connect this to the backend
      }}
    >
      {(formik) => (
        <Form>
          <Stack gap={2} alignItems="flex-start">
            <Field
              error={formik.errors.accessCode && formik.touched.accessCode}
              as={TextField}
              required
              id="accessCode"
              label="Access code"
              name="accessCode"
              type="text"
              variant="filled"
              color="secondary"
              helperText="Enter your access code"
            />
            <ErrorMessage name="accessCode">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
            <AccessCodeForgotPassword />
            <Button
              disabled={!(formik.dirty && formik.isValid)}
              href={`${studentUrlPrefix}/${formik.values.accessCode}`}
              type="submit"
              variant="contained"
              color="tertiary"
            >
              Log in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const AccessCodeForgotPassword: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight="bold"
        my={0}
        align="left"
        color={theme.palette.primary.contrastText}
      >
        Forgotten your login details? Please check with your teacher.
      </Typography>
    </Box>
  );
};

const AccessCodeLogin: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <Container>
        <BaseForm
          header="Welcome"
          subheader="Please enter your login details."
          userType="student"
        >
          <AccessCodeLoginForm />
        </BaseForm>
      </Container>
    </BasePage>
  );
};

export default AccessCodeLogin;
