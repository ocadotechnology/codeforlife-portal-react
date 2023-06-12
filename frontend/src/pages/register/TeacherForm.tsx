import React from 'react';
import { Link } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

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

const TeacherForm: React.FC = () => {
  return (
    <BaseForm
      header="Teacher/Tutor"
      subheader="Register below to create your school or club."
      description="You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono."
      userType='teacher'
      color="white"
    >
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: to call backend
          setSubmitting(false);
        }}
      >
        <TextField
          required
          name="firstName"
          placeholder="First name"
          helperText="Enter your first name"
        />
        <TextField
          required
          name="lastName"
          placeholder="Last name"
          helperText="Enter your last name"
        />
        <EmailField
          required
          placeholder="Email address"
          helperText="Enter your email address"
        />
        <CheckboxField
          required
          name="termsOfUse"
          formControlLabelProps={{
            label: <>
              I am over 18 years old have read and understood the&nbsp;
              <Link
                href={paths.termsOfUse._}
                target='_blank'
                color='inherit'
                className='body'
              >
                Terms of use
              </Link>
              &nbsp;and the&nbsp;
              <Link
                href={paths.privacyNotice._}
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
          name="receiveUpdates"
          formControlLabelProps={{
            label:
              'Sign up to receive updates about Code for Life games and teaching resources.'
          }}
        />
        <CflPasswordFields userType='teacher' />
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
