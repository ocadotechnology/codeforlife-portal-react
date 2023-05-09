import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  useTheme,
  Link,
  Button,
  FormHelperText
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import {
  Formik,
  Form,
  FormikHelpers
} from 'formik';
import * as Yup from 'yup';
import { isPasswordStrong, PASSWORD_STATUS, MOST_USED_PASSWORDS } from './constants';

import { paths } from 'app/router';
import CflDatePicker from '../../components/formik/CflDatePicker';
import CflTextField from '../../components/formik/CflTextField';
import CflCheckboxField from 'components/formik/CflCheckboxField';
import CflPasswordFields, { isStrongPassword } from '../../components/formik/CflPasswordFields';
import BaseForm from './BaseForm';

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

const indepPasswordStrengthCheck = (password: string): boolean => (password.length >= 8 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1));

const validationSchema: { [K in keyof IndependentFormValues]: Yup.Schema } = {
  fullName: Yup
    .string()
    .required('This field is required'),
  email: Yup
    .string()
    .email('Invalid email address')
    .required('This field is required'),
  termsOfUse: Yup
    .bool()
    .oneOf([true], 'You need to accept the terms and conditions'),
  receiveUpdates: Yup
    .bool(),
  password: Yup
    .string()
    .required('This field is required')
    .test(
      'independent-password-strength-check',
      'Invalid password',
      indepPasswordStrengthCheck
    ),
  repeatPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), undefined], "Passwords don't match")
    .required('This field is required')
};

const IndependentForm: React.FC = () => {
  const navigate = useNavigate();
  const [yearsOfAge, setYearsOfAge] = React.useState<number>();

  const EmailApplicableAge = 13;
  const ReceiveUpdateAge = 18;

  function onDateOfBirthChange(dob: Date): void {
    setYearsOfAge(Math.floor(
      (new Date().getTime() - dob.getTime()) /
      (1000 * 60 * 60 * 24 * 365)
    ));
  }

  return (
    <BaseForm
      header='Independent learner'
      subheader='Register below if you are not part of a school or club and wish to set up a home learning account.'
      description='You will have access to learning resources for Rapid Router.'
      bgcolor='#ffc709' // TODO: use theme.palette
      formHelperTextColor='black'
    >
      <CflDatePicker
        helperText='Please enter your date of birth (we do not store this information).'
        onChange={onDateOfBirthChange}
      />
      {yearsOfAge !== undefined &&
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object(validationSchema)}
          onSubmit={(
            values: IndependentFormValues,
            { setSubmitting }: FormikHelpers<IndependentFormValues>
          ) => {
            // TODO: to call backend
            setSubmitting(false);
            navigate(paths.emailVerificationSent, { state: { isTeacher: false } });
          }}
        >
          {(formik) => (
            <Form>
              <CflTextField
                name='fullName'
                placeholder='Full name'
                helperText='Enter your full name'
                size='small'
              />
              <CflTextField
                name='email'
                placeholder='Email address'
                helperText={(yearsOfAge >= EmailApplicableAge)
                  ? 'Enter your email address'
                  : 'Please enter your parent\'s email address'
                }
                size='small'
              />
              {yearsOfAge < EmailApplicableAge &&
                <FormHelperText style={{ fontWeight: 'bold' }}>
                  We will send your parent/guardian an email to ask them to activate the account for you. Once they&apos;ve done this you&apos;ll be able to log in using your name and password.
                </FormHelperText>
              }
              {yearsOfAge >= EmailApplicableAge &&
                <CflCheckboxField
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
                <CflCheckboxField
                  name='receiveUpdates'
                  formControlLabelProps={{
                    label: 'Sign up to receive updates about Code for Life games and teaching resources.'
                  }}
                />
              }
              <CflPasswordFields
                forTeacher={false}
                size='small'
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
      }
    </BaseForm>
  );
};

export default IndependentForm;
