import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, FormHelperText } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import {
  Form,
  SubmitButton,
  EmailField,
  TextField,
  CheckboxField,
  DateField
} from 'codeforlife/lib/esm/components/form';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';
import { MIN_DATE } from 'codeforlife/lib/esm/helpers/general';

import { paths } from '../../app/router';
import { useRegisterUserMutation } from '../../app/api';
import BaseForm from './BaseForm';
import CflPasswordFields from '../../features/cflPasswordFields/CflPasswordFields';

interface IndependentFormValues {
  dateOfBirth: Date;
  name: string;
  email: string;
  consentTicked: boolean;
  newsletterTicked: boolean;
  password: string;
  confirmPassword: string;
}

const initialValues: IndependentFormValues = {
  dateOfBirth: MIN_DATE,
  name: '',
  email: '',
  consentTicked: false,
  newsletterTicked: false,
  password: '',
  confirmPassword: ''
};

const IndependentForm: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();

  const EmailApplicableAge = 13;
  const ReceiveUpdateAge = 18;

  return (
    <BaseForm
      header="Independent learner"
      subheader="Register below if you are not part of a school or club and wish to set up a home learning account."
      description="You will have access to learning resources for Rapid Router."
      userType='independent'
    >
      <Form
        initialValues={initialValues}
        onSubmit={submitForm(registerUser, {
          then: () => {
            navigate(paths.register.emailVerification.independent._);
          }
        })}
      >
        {(form) => {
          const yearsOfAge =
            form.values.dateOfBirth.getTime() === MIN_DATE.getTime()
              ? undefined
              : Math.floor(
                (new Date().getTime() - form.values.dateOfBirth.getTime()) /
                (1000 * 60 * 60 * 24 * 365)
              );

          return <>
            <DateField
              helperText="Please enter your date of birth (we do not store this information)."
              name='dateOfBirth'
            />
            {yearsOfAge !== undefined && <>
              <TextField
                required
                name="name"
                placeholder="Full name"
                helperText="Enter your full name"
              />
              <EmailField
                required
                placeholder="Email address"
                helperText={
                  yearsOfAge >= EmailApplicableAge
                    ? 'Enter your email address'
                    : "Please enter your parent's email address"
                }
              />
              {yearsOfAge < EmailApplicableAge && (
                <FormHelperText style={{ fontWeight: 'bold' }}>
                  We will send your parent/guardian an email to ask them to activate
                  the account for you. Once they&apos;ve done this you&apos;ll be
                  able to log in using your name and password.
                </FormHelperText>
              )}
              {yearsOfAge >= EmailApplicableAge && (
                <CheckboxField
                  required
                  name="consentTicked"
                  formControlLabelProps={{
                    label: <>
                      I have read and understood the &nbsp;
                      <Link
                        onClick={() => { navigate(paths.termsOfUse.termsOfUse._); }}
                        target='_blank'
                        color='inherit'
                      >
                        Terms of use
                      </Link>
                      &nbsp;and the&nbsp;
                      <Link
                        onClick={() => { navigate(paths.privacyNotice.privacyNotice._); }}
                        target='_blank'
                        color='inherit'
                      >
                        Privacy notice
                      </Link>
                      .
                    </>
                  }}
                />
              )}
              {yearsOfAge >= ReceiveUpdateAge && (
                <CheckboxField
                  name="newsletterTicked"
                  formControlLabelProps={{
                    label:
                      'Sign up to receive updates about Code for Life games and teaching resources.'
                  }}
                />
              )}
              <CflPasswordFields
                userType='independent'
                repeatPasswordName='confirmPassword'
              />
              <SubmitButton
                stackProps={{ alignItems: 'end' }}
                endIcon={<ChevronRightIcon />}
              >
                Register
              </SubmitButton>
            </>}
          </>;
        }}
      </Form>
    </BaseForm>
  );
};

export default IndependentForm;
