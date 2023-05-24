import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Stack
} from '@mui/material';

import {
  Form,
  CheckboxField,
  EmailField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

interface SignUpValues {
  email: string;
  over18: boolean;
}

const initialValues: SignUpValues = {
  email: '',
  over18: false
};

const SignUp: React.FC = () => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Stack>
      <Typography textAlign={isXS ? 'center' : undefined}>
        Sign up to receive updates about Code for Life games and teaching resources.
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: to call backend
          setSubmitting(false);
        }}
      >
        <Grid container>
          <Grid xs={12}>
            <EmailField
              required
              placeholder='Your email address'
              helperText='Enter email address above'
              FormHelperTextProps={{
                style: { color: 'white' }
              }}
            />
          </Grid>
          <Grid xs={12} sm={8} className={isXS ? 'flex-center-x' : undefined}>
            <CheckboxField
              required
              name='over18'
              formControlLabelProps={{
                label: 'Please confirm that you are over 18.'
              }}
            />
          </Grid>
          <Grid xs={12} sm={4} className={isXS ? undefined : 'flex-end-x'}>
            <SubmitButton style={{
              width: isXS ? '100%' : undefined,
              marginLeft: 'auto'
            }}>
              Register
            </SubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Stack>
  );
};

export default SignUp;
