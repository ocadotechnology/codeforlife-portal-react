import React from 'react';

import { Form, Formik } from 'formik';
import { DEFAULT_LOGIN_INITIAL_VALUES } from './constants';
import { DefaultLoginSchema } from './schemas';
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import BasePage from 'pages/BasePage';
import BaseForm from './BaseForm';
import CflTextField from 'components/formik/CflTextField';

const IndependentStudentLogin: React.FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={DEFAULT_LOGIN_INITIAL_VALUES}
      validationSchema={DefaultLoginSchema}
      onSubmit={async (values, errors) => {
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      {(formik) => (
        <Form>
          <Stack gap={2} alignItems="stretch">
            <CflTextField
              name="username"
              placeholder="Email address"
              helperText="Enter your email address"
              size="small"
              type="email"
              color="tertiary"
            />
            <CflTextField
              name="password"
              placeholder="Password"
              helperText="Enter your password"
              size="small"
              type="password"
              color="tertiary"
            />
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
  return (
    <BasePage>
      <Container>
        <BaseForm
          header="Welcome"
          subheader="Please enter your login details."
          userType="independent"
        >
          <IndependentStudentLogin />
        </BaseForm>
      </Container>
    </BasePage>
  );
};

export default IndependentLogin;
