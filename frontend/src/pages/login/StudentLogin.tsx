import React from 'react';

import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { SCHOOL_STUDENT_LOGIN_INITIAL_VALUES } from './constants';
import { SchoolStudentLoginSchema } from './schemas';
import BasePage from 'pages/BasePage';
import BaseForm from './BaseForm';
import CflTextField from 'components/formik/CflTextField';

const StudentLoginForm: React.FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <Formik
      initialValues={{
        ...SCHOOL_STUDENT_LOGIN_INITIAL_VALUES,
        accessCode: location.pathname.split('/').pop() // dynamically set access code
      }}
      validationSchema={SchoolStudentLoginSchema}
      onSubmit={async (values, errors) => {
        alert(JSON.stringify(values));
        // TODO: Connect this to the backend
      }}
    >
      {(formik) => (
        <Form>
          <Stack gap={2} alignItems="stretch">
            <CflTextField
              name="firstname"
              placeholder="Username"
              helperText="Enter your username"
              size="small"
              type="text"
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
  const accessCode = location.pathname.split('/').pop() ?? '';
  return (
    <BasePage>
      <Container>
        <BaseForm
          header={`Welcome to class: ${accessCode}`}
          subheader="Please enter your login details."
          userType="student"
        >
          <StudentLoginForm />
        </BaseForm>
      </Container>
    </BasePage>
  );
};

export default StudentLogin;
