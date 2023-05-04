import React from 'react';
import LoginWindow from './LoginWindow';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { STUDENT_LOGIN_INITIAL_VALUES } from './constants';
import { StudentLoginSchema } from './schemas';
import BasePage from 'pages/BasePage';

const StudentLoginForm: React.FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <Formik
      initialValues={{
        ...STUDENT_LOGIN_INITIAL_VALUES,
        accessCode: location.pathname.split('/').pop() // dynamically set access code
      }}
      validationSchema={StudentLoginSchema}
      onSubmit={async (values, errors) => {
        console.log(errors);

        const validate = await errors.validateForm();
        const val = await StudentLoginSchema.validate(values);
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
              error={formik.errors.firstname && formik.touched.firstname}
              as={TextField}
              required
              id="firstname"
              label="Username"
              name="firstname"
              type="text"
              variant="filled"
              color="secondary"
              helperText="Enter your username"
            />
            <ErrorMessage name="firstname">
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
              color="secondary"
              helperText="Enter your password"
            />
            <ErrorMessage name="password">
              {(msg) => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
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

const StudentLogin: React.FC = (): JSX.Element => {
  const location = useLocation();
  const theme = useTheme();
  const accessCode = location.pathname.split('/').pop();
  return (
    <BasePage>
      <LoginWindow userType="student">
        <Typography
          variant="h4"
          align="center"
          color={theme.palette.primary.contrastText}
        >
          Welcome to class: {accessCode}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color={theme.palette.primary.contrastText}
        >
          Please enter your login details.
        </Typography>
        <StudentLoginForm />
      </LoginWindow>
    </BasePage>
  );
};

export default StudentLogin;
