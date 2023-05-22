import React from 'react';
<<<<<<< HEAD
import { Stack, Link, Button, InputAdornment } from '@mui/material';
=======
import {
  Link
} from '@mui/material';
>>>>>>> main
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
<<<<<<< HEAD
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import CflTextField from '../../components/formik/CflTextField';
import CflCheckboxField from '../../components/formik/CflCheckboxField';
import CflPasswordFields, {
  isStrongPassword
} from '../../components/formik/CflPasswordFields';
=======

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import CflPasswordFields from '../../components/CflPasswordFields';

import {
  Form,
  SubmitButton,
  EmailField,
  CheckboxField,
  TextField
} from 'codeforlife/lib/esm/components/form';
>>>>>>> main

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const initialValues: TeacherFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  termsOfUse: false,
  receiveUpdates: false,
  password: '',
  repeatPassword: ''
};

<<<<<<< HEAD
const validationSchema: { [K in keyof TeacherFormValues]: Yup.Schema } = {
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  termsOfUse: Yup.bool().oneOf(
    [true],
    'You need to accept the terms and conditions'
  ),
  receiveUpdates: Yup.bool(),
  password: Yup.string()
    .required('This field is required')
    .test('teacher-password-strength-check', 'Invalid password', (password) =>
      isStrongPassword(password, { forTeacher: true })
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
    .required('This field is required')
};

=======
>>>>>>> main
const TeacherForm: React.FC = () => {
  return (
    <BaseForm
      header="Teacher/Tutor"
      subheader="Register below to create your school or club."
      description="You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono."
      bgcolor="#ee0857" // TODO: use theme.palette
      color="white"
    >
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: to call backend
          setSubmitting(false);
        }}
      >
<<<<<<< HEAD
        {(formik) => (
          <Form>
            <CflTextField
              name="firstName"
              placeholder="First name"
              helperText="Enter your first name"
            />
            <CflTextField
              name="lastName"
              placeholder="Last name"
              helperText="Enter your last name"
            />
            <CflTextField
              name="email"
              placeholder="Email address"
              helperText="Enter your email address"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
            <CflCheckboxField
              name="termsOfUse"
              formControlLabelProps={{
                label: (
                  <>
                    I am over 18 years old have read and understood the&nbsp;
                    <Link
                      href={paths.termsOfUse}
                      target="_blank"
                      color="inherit"
                      className="body"
                    >
                      Terms of use
                    </Link>
                    &nbsp;and the&nbsp;
                    <Link
                      href={paths.privacyNotice}
                      target="_blank"
                      color="inherit"
                      className="body"
                    >
                      Privacy notice
                    </Link>
                    .
                  </>
                )
              }}
            />
            <CflCheckboxField
              name="receiveUpdates"
              formControlLabelProps={{
                label:
                  'Sign up to receive updates about Code for Life games and teaching resources.'
              }}
            />
            <CflPasswordFields forTeacher={true} />
            <Stack direction="row" justifyContent="end">
              <Button
                type="submit"
                endIcon={<ChevronRightIcon />}
                disabled={!formik.dirty}
=======
        <TextField
          required
          name='firstName'
          placeholder='First name'
          helperText='Enter your first name'
        />
        <TextField
          required
          name='lastName'
          placeholder='Last name'
          helperText='Enter your last name'
        />
        <EmailField
          required
          placeholder='Email address'
          helperText='Enter your email address'
        />
        <CheckboxField
          required
          name='termsOfUse'
          formControlLabelProps={{
            label: <>
              I am over 18 years old have read and understood the&nbsp;
              <Link
                href={paths.termsOfUse}
                target='_blank'
                color='inherit'
                className='body'
>>>>>>> main
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
            </>
          }}
        />
        <CheckboxField
          name='receiveUpdates'
          formControlLabelProps={{
            label: 'Sign up to receive updates about Code for Life games and teaching resources.'
          }}
        />
        <CflPasswordFields forTeacher={true} />
        <SubmitButton
          stackProps={{ alignItems: 'end' }}
          endIcon={<ChevronRightIcon />}
        >
          Register
        </SubmitButton>
      </Form>
    </BaseForm>
  );
};

export default TeacherForm;
