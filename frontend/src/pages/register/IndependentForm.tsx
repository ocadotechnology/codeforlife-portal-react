import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, FormHelperText } from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

import { paths } from '../../app/router';
import BaseForm from './BaseForm';
import DatePicker from '../../components/DatePicker';
import CflPasswordFields from '../../features/cflPasswordFields/CflPasswordFields';

import {
  Form,
  SubmitButton,
  EmailField,
  TextField,
  CheckboxField
} from 'codeforlife/lib/esm/components/form';

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

const IndependentForm: React.FC = () => {
  const navigate = useNavigate();
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
      userType='independent'
    >
      <DatePicker
        helperText="Please enter your date of birth (we do not store this information)."
        onChange={onDateOfBirthChange}
      />
      {yearsOfAge !== undefined && (
        <Form
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            // TODO: to call backend
            setSubmitting(false);
          }}
        >
          <TextField
            required
            name="fullName"
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
              name="termsOfUse"
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
              name="receiveUpdates"
              formControlLabelProps={{
                label:
                  'Sign up to receive updates about Code for Life games and teaching resources.'
              }}
            />
          )}
          <CflPasswordFields userType='independent' />
          <SubmitButton
            stackProps={{ alignItems: 'end' }}
            endIcon={<ChevronRightIcon />}
          >
            Register
          </SubmitButton>
        </Form>
      )}
    </BaseForm>
  );
};

export default IndependentForm;
