import React from 'react';
import { Formik, Form } from 'formik';
import { DEFAULT_LOGIN_INITIAL_VALUES } from './constants';
import {
  Box,
  Link,
  Stack,
  Typography,
  useTheme,
  Button,
  Container
} from '@mui/material';
import { DefaultLoginSchema } from './schemas';
import BasePage from 'pages/BasePage';
import BaseForm from './BaseForm';
import { DefaultLoginProps } from './interfaces';
import CflTextField from 'components/formik/CflTextField';

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
      initialValues={DEFAULT_LOGIN_INITIAL_VALUES}
      validationSchema={DefaultLoginSchema}
      onSubmit={async (values: DefaultLoginProps, { setSubmitting }) => {
        // TODO: Connect this to the backend
        console.log(values);
        setSubmitting(false);
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
            />
            <CflTextField
              name="password"
              placeholder="Password"
              helperText="Enter your password"
              size="small"
              type="password"
            />
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
  return (
    <BasePage>
      <Container>
        <BaseForm
          header="Welcome"
          subheader="Please enter your login details."
          userType="teacher"
        >
          <TeacherLoginForm />
        </BaseForm>
      </Container>
    </BasePage>
  );
};

export default TeacherLogin;
