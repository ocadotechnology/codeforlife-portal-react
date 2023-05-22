import React from 'react';
<<<<<<< HEAD
import { Stack, Link, Button, FormHelperText } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
=======
import {
  Link,
  FormHelperText
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
>>>>>>> main

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import DatePicker from '../../components/DatePicker';
<<<<<<< HEAD
import CflTextField from '../../components/formik/CflTextField';
import CflCheckboxField from '../../components/formik/CflCheckboxField';
import CflPasswordFields, {
  isStrongPassword
} from '../../components/formik/CflPasswordFields';
=======
import CflPasswordFields from '../../components/CflPasswordFields';

import {
  Form,
  SubmitButton,
  EmailField,
  TextField,
  CheckboxField
} from 'codeforlife/lib/esm/components/form';
>>>>>>> main

interface IndependentFormValues {
  fullName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const initialValues: IndependentFormValues = {
  fullName: '',
  email: '',
  termsOfUse: false,
  receiveUpdates: false,
  password: '',
  repeatPassword: ''
};

<<<<<<< HEAD
const validationSchema: { [K in keyof IndependentFormValues]: Yup.Schema } = {
  fullName: Yup.string().required('This field is required'),
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
    .test(
      'independent-password-strength-check',
      'Invalid password',
      (password) => isStrongPassword(password, { forTeacher: false })
    ),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
    .required('This field is required')
};

=======
>>>>>>> main
const IndependentForm: React.FC = () => {
  const [yearsOfAge, setYearsOfAge] = React.useState<number>();

  const EmailApplicableAge = 13;
  const ReceiveUpdateAge = 18;

  function onDateOfBirthChange(dob: Date | undefined): void {
    setYearsOfAge(
      dob === undefined
        ? undefined
        : Math.floor(
            (new Date().getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365)
          )
    );
  }

  return (
    <BaseForm
      header="Independent learner"
      subheader="Register below if you are not part of a school or club and wish to set up a home learning account."
      description="You will have access to learning resources for Rapid Router."
      bgcolor="#ffc709" // TODO: use theme.palette
      color="black"
    >
      <DatePicker
        helperText="Please enter your date of birth (we do not store this information)."
        onChange={onDateOfBirthChange}
      />
<<<<<<< HEAD
      {yearsOfAge !== undefined && (
        <Formik
=======
      {yearsOfAge !== undefined &&
        <Form
>>>>>>> main
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
                name="fullName"
                placeholder="Full name"
                helperText="Enter your full name"
              />
              <CflTextField
                name="email"
                placeholder="Email address"
                helperText={
                  yearsOfAge >= EmailApplicableAge
                    ? 'Enter your email address'
                    : "Please enter your parent's email address"
                }
              />
              {yearsOfAge < EmailApplicableAge && (
                <FormHelperText style={{ fontWeight: 'bold' }}>
                  We will send your parent/guardian an email to ask them to
                  activate the account for you. Once they&apos;ve done this
                  you&apos;ll be able to log in using your name and password.
                </FormHelperText>
              )}
              {yearsOfAge >= EmailApplicableAge && (
                <CflCheckboxField
                  name="termsOfUse"
                  formControlLabelProps={{
                    label: (
                      <>
                        I have read and understood the &nbsp;
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
              )}
              {yearsOfAge >= ReceiveUpdateAge && (
                <CflCheckboxField
                  name="receiveUpdates"
                  formControlLabelProps={{
                    label:
                      'Sign up to receive updates about Code for Life games and teaching resources.'
                  }}
                />
              )}
              <CflPasswordFields forTeacher={false} />
              <Stack direction="row" justifyContent="end">
                <Button
                  type="submit"
                  endIcon={<ChevronRightIcon />}
                  disabled={!formik.dirty}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
=======
          <TextField
            required
            name='fullName'
            placeholder='Full name'
            helperText='Enter your full name'
          />
          <EmailField
            required
            placeholder='Email address'
            helperText={(yearsOfAge >= EmailApplicableAge)
              ? 'Enter your email address'
              : 'Please enter your parent\'s email address'
            }
          />
          {yearsOfAge < EmailApplicableAge &&
            <FormHelperText style={{ fontWeight: 'bold' }}>
              We will send your parent/guardian an email to ask them to activate the account for you. Once they&apos;ve done this you&apos;ll be able to log in using your name and password.
            </FormHelperText>
          }
          {yearsOfAge >= EmailApplicableAge &&
            <CheckboxField
              required
              name='termsOfUse'
              formControlLabelProps={{
                label: <>
                  I have read and understood the &nbsp;
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
                </>
              }}
            />
          }
          {yearsOfAge >= ReceiveUpdateAge &&
            <CheckboxField
              name='receiveUpdates'
              formControlLabelProps={{
                label: 'Sign up to receive updates about Code for Life games and teaching resources.'
              }}
            />
          }
          <CflPasswordFields forTeacher={false} />
          <SubmitButton
            stackProps={{ alignItems: 'end' }}
            endIcon={<ChevronRightIcon />}
          >
            Register
          </SubmitButton>
        </Form>
      }
>>>>>>> main
    </BaseForm>
  );
};

export default IndependentForm;
