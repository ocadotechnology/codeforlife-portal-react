import React from 'react';
import LoginWindow from './LoginWindow';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { LOGIN_INITIAL_VALUES } from './constants';
import { LoginSchema } from './schemas';
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import BasePage from 'pages/BasePage';

const IndependentStudentLogin: React.FC = (): JSX.Element => {
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
              color="tertiary"
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
              color="tertiary"
            />
            <ErrorMessage name="password">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
            <IndependentForgotPassword />
            <Box marginLeft="auto">
              <Button
                disabled={!(formik.dirty && formik.isValid)}
                type="submit"
                variant="contained"
                color="info"
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

const IndependentForgotPassword: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Box marginRight="auto">
      <Typography
        variant="body2"
        fontWeight="bold"
        my={0}
        align="left"
        color={theme.palette.tertiary.contrastText}
      >
        Forgotten your password?
      </Typography>
      <Typography
        variant="body2"
        align="left"
        color={theme.palette.tertiary.contrastText}
      >
        Don&apos;t worry, you can{' '}
        <Link
          underline="always"
          color={theme.palette.tertiary.contrastText}
          href="#"
        >
          reset your password.
        </Link>
      </Typography>
      <Typography
        variant="body2"
        fontWeight="bold"
        my={0}
        align="left"
        color={theme.palette.tertiary.contrastText}
      >
        Part of a school or club?{' '}
        <Link
          fontWeight="400"
          underline="always"
          color={theme.palette.tertiary.contrastText}
          href="#"
        >
          Log in here.
        </Link>
      </Typography>
    </Box>
  );
};

const IndependentLogin: React.FC = () => {
  const theme = useTheme();
  return (
    <BasePage>
      <LoginWindow userType="independent">
        <Typography
          variant="h4"
          align="center"
          color={theme.palette.tertiary.contrastText}
        >
          Welcome
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color={theme.palette.tertiary.contrastText}
        >
          Please enter your login details.
        </Typography>
        <IndependentStudentLogin />
      </LoginWindow>
    </BasePage>
  );
};

export default IndependentLogin;
