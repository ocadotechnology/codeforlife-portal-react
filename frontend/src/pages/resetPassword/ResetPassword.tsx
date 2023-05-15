import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  Button
} from '@mui/material';
import * as Yup from 'yup';

import {
  getSearchParams,
  stringToProperty
} from 'codeforlife/lib/esm/helpers';

import { paths } from '../../app/router';
import BasePage from '../../pages/BasePage';
import PageSection from '../../components/PageSection';
import ThemedBox from '../../components/ThemedBox';
import CflForm from '../../components/formik/CflForm';
import CflTextField from '../../components/formik/CflTextField';

enum UserType {
  teacher = 'teacher',
  independent = 'independent'
}

interface ResetPasswordParams {
  userType: UserType
}

interface ResetPasswordForm {
  email: string;
}

const initialValues: ResetPasswordForm = {
  email: ''
};

const validationSchema: { [V in keyof ResetPasswordForm]: Yup.Schema } = {
  email: Yup
    .string()
    .email()
    .required()
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();

  let params = getSearchParams({
    userType: { cast: stringToProperty(UserType) }
  }) as ResetPasswordParams | null;

  React.useEffect(() => {
    if (params === null) {
      navigate(paths.internalServerError);
    }
  }, []);

  if (params === null) return <></>;
  else if (params.userType === undefined) {
    params = null;
    return <></>;
  }

  return (
    <BasePage>
      <PageSection maxWidth='md'>
        <ThemedBox withIcons userType={params.userType}>
          <Stack gap={1}>
            <Typography textAlign='center' variant='h4'>
              Reset password
            </Typography>
            <Typography textAlign='center' variant='h5'>
              Please enter your email address
            </Typography>
            <Typography textAlign='center'>
              We will send an email with a link to reset your password.
            </Typography>
            <CflForm
              initialValues={initialValues}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={(values, { setSubmitting }) => {
                // TODO: Connect this to the backend
                console.log(values);
                setSubmitting(false);
              }}
            >
              {(formik) => <>
                <CflTextField
                  name='email'
                  type='email'
                  placeholder='Email address'
                  helperText='Enter your email address'
                />
                <Stack direction='row' gap={5} justifyContent='center'>
                  <Button
                    className='cancel'
                    onClick={() => { navigate(-1); }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={!(formik.dirty && formik.isValid)}
                    type='submit'
                  >
                    Reset password
                  </Button>
                </Stack>
              </>}
            </CflForm>
          </Stack>
        </ThemedBox>
      </PageSection>
    </BasePage>
  );
};

export default ResetPassword;
