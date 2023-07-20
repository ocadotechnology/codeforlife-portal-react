import React from 'react';
import { Link } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import {
  Form,
  SubmitButton,
  CheckboxField,
  TextField
} from 'codeforlife/lib/esm/components/form';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import CflPasswordFields from '../../components/CflPasswordFields';
import { useRegisterUserMutation } from '../../app/api';

// TODO: Once backend is modernised, rename the variables
// to something more readable on both frontend and backend
interface TeacherFormValues {
  'teacher_signup-teacher_first_name': string;
  'teacher_signup-teacher_last_name': string;
  'teacher_signup-teacher_email': string;
  'teacher_signup-teacher_password': string;
  'teacher_signup-teacher_confirm_password': string;
  'teacher_signup-consent_ticked': boolean;
  'teacher_signup-newsletter_ticked': boolean;
}

const initialValues: TeacherFormValues = {
  'teacher_signup-teacher_first_name': '',
  'teacher_signup-teacher_last_name': '',
  'teacher_signup-teacher_email': '',
  'teacher_signup-teacher_password': '',
  'teacher_signup-teacher_confirm_password': '',
  'teacher_signup-consent_ticked': false,
  'teacher_signup-newsletter_ticked': false
};

// TODO: Follow up from above, once backend is modernised, please also
// rename the 'name' attribute to the same keys as above for each field
const TeacherForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const handleSubmit = (values: any): void => {
    registerUser(values)
      .unwrap()
      .then(() => {
        navigate('/register/email-verification/teacher');
      })
      .catch((error) => {
        console.error(error);
        // TODO: set errors in the form for any async from errors ?
      });
  };

  return (
    <BaseForm
      subheader="Register below to create your school or club."
      description="You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono."
      header="Teacher/Tutor"
      userType="teacher"
    >
      <Form
        initialValues={initialValues}
        onSubmit={(values, event) => {
          // TODO: to call backend
          handleSubmit(values);
        }}
      >
        <TextField
          required
          name="teacher_signup-teacher_first_name"
          placeholder="First name"
          helperText="Enter your first name"
        />
        <TextField
          required
          name="teacher_signup-teacher_last_name"
          placeholder="Last name"
          helperText="Enter your last name"
        />
        <TextField
          required
          name="teacher_signup-teacher_email"
          placeholder="Email address"
          helperText="Enter your email address"
        />
        <CheckboxField
          required
          name="teacher_signup-consent_ticked"
          formControlLabelProps={{
            label: (
              <>
                I am over 18 years old have read and understood the&nbsp;
                <Link
                  href={paths.termsOfUse.termsOfUse._}
                  target="_blank"
                  color="inherit"
                >
                  Terms of use
                </Link>
                &nbsp;and the&nbsp;
                <Link
                  href={paths.privacyNotice.privacyNotice._}
                  target="_blank"
                  color="inherit"
                >
                  Privacy notice
                </Link>
                .
              </>
            )
          }}
        />
        <CheckboxField
          name="teacher_signup-newsletter_ticked"
          formControlLabelProps={{
            label:
              'Sign up to receive updates about Code for Life games and teaching resources.'
          }}
        />
        {/* TODO: Rename the fields here too! */}
        <CflPasswordFields userType="teacher" />
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
