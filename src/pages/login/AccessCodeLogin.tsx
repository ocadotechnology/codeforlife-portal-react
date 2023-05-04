import React from 'react';
import LoginWindow from './LoginWindow';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ACCESS_CODE_LOGIN_INITIAL_VALUES } from './constants';
import { AccessCodeLoginSchema } from './schemas';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

const IndependentStudentLogin: React.FC = (): JSX.Element => {
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
        alert(JSON.stringify(values));
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
            <IndependentForgotPassword />
            <Button
              disabled={!(formik.dirty && formik.isValid)}
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

const IndependentForgotPassword: React.FC = (): JSX.Element => {
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

const IndependentLogin: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <LoginWindow userType="student">
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
      <IndependentStudentLogin />
    </LoginWindow>
  );
};

export default IndependentLogin;
