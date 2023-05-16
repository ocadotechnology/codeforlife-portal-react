import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  InputAdornment,
  Button,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';
import {
  EmailOutlined as EmailOutlinedIcon
} from '@mui/icons-material';
import * as Yup from 'yup';

import CflForm from '../../components/formik/CflForm';
import CflCheckboxField from '../../components/formik/CflCheckboxField';
import CflTextField from '../../components/formik/CflTextField';

interface SignUpValues {
  email: string;
  over18: boolean;
}

const initialValues: SignUpValues = {
  email: '',
  over18: false
};

const validationSchema: { [K in keyof SignUpValues]: Yup.Schema } = {
  email: Yup
    .string()
    .email()
    .required(),
  over18: Yup
    .bool()
    .oneOf([true])
};

const SignUp: React.FC = () => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Stack>
      <Typography textAlign={isXS ? 'center' : undefined}>
        Sign up to receive updates about Code for Life games and teaching resources.
      </Typography>
      <CflForm
        initialValues={initialValues}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: to call backend
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Grid container>
            <Grid xs={12}>
              <CflTextField
                name='email'
                type='email'
                placeholder='Your email address'
                helperText='Enter email address above'
                FormHelperTextProps={{
                  style: { color: 'white' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid xs={12} sm={8} className={isXS ? 'flex-center-x' : undefined}>
              <CflCheckboxField
                name='over18'
                formControlLabelProps={{
                  label: 'Please confirm that you are over 18.'
                }}
              />
            </Grid>
            <Grid xs={12} sm={4} className={isXS ? undefined : 'flex-end-x'}>
              <Button
                type='submit'
                disabled={!(formik.dirty && formik.isValid)}
                style={{
                  width: isXS ? '100%' : undefined,
                  marginLeft: 'auto'
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        )}
      </CflForm>
    </Stack>
  );
};

export default SignUp;
