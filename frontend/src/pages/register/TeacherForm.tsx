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
import { setFormErrors } from 'codeforlife/lib/esm/helpers/formik';

import CflPasswordFields from '../../features/cflPasswordFields/CflPasswordFields';
import { useRegisterUserMutation } from '../../app/api';
import { paths } from '../../app/router';
import BaseForm from './BaseForm';

// TODO: Once backend is modernised, rename the variables
// to something more readable on both frontend and backend
interface TeacherFormValues {
  teacherFirstName: string;
  teacherLastName: string;
  teacherEmail: string;
  teacherPassword: string;
  teacherConfirmPassword: string;
  consentTicked: boolean;
  newsletterTicked: boolean;
}

const initialValues: TeacherFormValues = {
  teacherFirstName: '',
  teacherLastName: '',
  teacherEmail: '',
  teacherPassword: '',
  teacherConfirmPassword: '',
  consentTicked: false,
  newsletterTicked: false
};

// TODO: Follow up from above, once backend is modernised, please also
// rename the 'name' attribute to the same keys as above for each field
const TeacherForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  return (
    <BaseForm
      subheader="Register below to create your school or club."
      description="You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono."
      header="Teacher/Tutor"
      userType="teacher"
    >
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setErrors }) => {
          registerUser(values)
            .unwrap()
            .then(() => {
              navigate(paths.register.emailVerification.teacher._);
            })
            .catch((error) => { setFormErrors(error, setErrors); });
        }}
      >
        <TextField
          required
          name="teacherFirstName"
          placeholder="First name"
          helperText="Enter your first name"
        />
        <TextField
          required
          name="teacherLastName"
          placeholder="Last name"
          helperText="Enter your last name"
        />
        <TextField
          required
          name="teacherEmail"
          placeholder="Email address"
          helperText="Enter your email address"
        />
        <CheckboxField
          required
          name="consentTicked"
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
          name="newsletterTicked"
          formControlLabelProps={{
            label:
              'Sign up to receive updates about Code for Life games and teaching resources.'
          }}
        />
        {/* TODO: Rename the fields here too! */}
        <CflPasswordFields
          userType="teacher"
          passwordName='teacherPassword'
          repeatPasswordName='teacherConfirmPassword'
        />
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
