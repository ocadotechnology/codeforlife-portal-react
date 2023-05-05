import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Stack,
  Link,
  Button
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import {
  Formik,
  FormikHelpers,
  Form
} from 'formik';
import * as Yup from 'yup';

import { paths } from 'app/router';

import BaseForm from './form/BaseForm';
import TextFormField from './form/TextFormField';
import FormField from '../../components/FormField';
import PasswordFormFields, { isStrongPassword } from '../../components/PasswordFormFields';

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const TeacherForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: TeacherFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    termsOfUse: false,
    receiveUpdates: false,
    password: '',
    repeatPassword: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup
      .string()
      .required('This field is required'),
    lastName: Yup
      .string()
      .required('This field is required'),
    email: Yup
      .string()
      .email('Invalid email address')
      .required('This field is required'),
    termsOfUse: Yup
      .bool()
      .oneOf([true], 'You need to accept the terms and conditions'),
    password: Yup
      .string()
      .required('This field is required')
      .test(
        'teacher-password-strength-check',
        'Invalid password',
        (password) => isStrongPassword(password, { forTeacher: true })
      ),
    repeatPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
      .required('This field is required')
  });

  return (
    <BaseForm
      header='Teacher/Tutor'
      subheader='Register below to create your school or club.'
      description='You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono.'
      color='white'
      bgcolor='#ee0857'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: TeacherFormValues,
          { setSubmitting }: FormikHelpers<TeacherFormValues>
        ) => {
          // TODO: to call backend
          setSubmitting(false);
          navigate(paths.emailVerificationSent, {
            state: { isTeacher: true }
          });
        }}
      >
        {(formik) => (
          <Form>
            <TextFormField
              name='firstName'
              placeholder='First name'
              helperText='Enter your first name'
            />
            <TextFormField
              name='lastName'
              placeholder='Last name'
              helperText='Enter your last name'
            />
            <TextFormField
              name='email'
              placeholder='Email address'
              helperText='Enter your email address'
            />

            <Typography>
              <FormField type='checkbox' name='termsOfUse' />
              &nbsp;I am over 18 years old have read and understood the&nbsp;
              <Link
                href={paths.termsOfUse}
                target='_blank'
                color='inherit'
                className='body'
              >
                Terms of use
              </Link>
              &nbsp;and the&nbsp;
              <Link
                href={paths.privacyNotice}
                target='_blank'
                color='inherit'
                className='body'
              >
                Privacy notice
              </Link>
              .
            </Typography>
            <Typography>
              <FormField type='checkbox' name='receiveUpdates' />
              &nbsp;Sign up to receive updates about Code for Life games and teaching resources.
            </Typography>

            <PasswordFormFields
              forTeacher={true}
              textFieldProps={{
                size: 'small',
                FormHelperTextProps: {
                  style: { color: 'white' }
                }
              }}
            />
            <Stack direction='row' justifyContent='end'>
              <Button
                type='submit'
                endIcon={<ChevronRightIcon />}
                disabled={!formik.dirty}
              >
                Register
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </BaseForm>
  );
};

export default TeacherForm;
