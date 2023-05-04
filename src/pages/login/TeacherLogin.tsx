import React from 'react';
import LoginWindow from './LoginWindow';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LOGIN_INITIAL_VALUES } from './constants';
import {
  Box,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
  Button
} from '@mui/material';
import { LoginSchema } from './schemas';
import BasePage from 'pages/BasePage';

const TeacherForgotPassword: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box marginRight="auto">
      <Typography
        variant="body2"
        fontWeight="bold"
        my={0}
        align="left"
        color={theme.palette.primary.contrastText}
      >
        Forgotten your password?
      </Typography>
      <Typography
        variant="body2"
        align="left"
        color={theme.palette.primary.contrastText}
      >
        Don&apos;t worry, you can{' '}
        <Link
          underline="always"
          color={theme.palette.primary.contrastText}
          href="#"
        >
          reset your password.
        </Link>
      </Typography>
    </Box>
  );
};

const TeacherLoginForm: React.FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={LOGIN_INITIAL_VALUES}
      validationSchema={LoginSchema}
      onSubmit={async (values, errors) => {
        console.log(errors);

        const validate = await errors.validateForm();
        const val = await LoginSchema.validate(values);
        console.log(val);
        console.log(validate);
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      {(formik) => (
        <Form>
          <Stack gap={2} alignItems="flex-start">
            <Field
              error={formik.errors.username && formik.touched.username}
              as={TextField}
              required
              id="username"
              label="Email address"
              name="username"
              type="email"
              variant="filled"
              color="primary"
              helperText="Enter your email address"
            />
            <ErrorMessage name="username">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>

            <Field
              error={formik.errors.password && formik.touched.password}
              as={TextField}
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="filled"
              helperText="Enter your password"
              color="primary"
            />
            <ErrorMessage name="password">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
            <TeacherForgotPassword />
            <Box marginLeft="auto">
              <Button
                disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                variant="contained"
                color="tertiary"
              >
                Log in
              </Button>
            </Box>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

const TeacherLogin: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <BasePage>
      <LoginWindow userType="teacher">
        <Typography
          variant="h4"
          align="center"
          color={theme.palette.primary.contrastText}
        >
          Welcome
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color={theme.palette.primary.contrastText}
        >
          Please enter your login details.
        </Typography>
        <TeacherLoginForm />
      </LoginWindow>
    </BasePage>
  );
};

export default TeacherLogin;
