import React from 'react';
import {
  Unstable_Grid2 as Grid,
  useTheme,
  useMediaQuery,
  Stack,
  FormHelperText
} from '@mui/material';

import {
  Form,
  CheckboxField,
  EmailField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';

const SignUp: React.FC = () => {
  const theme = useTheme();
  const onlyXS = useMediaQuery(theme.breakpoints.only('xs'));

  const initialValues: {
    email: string;
    over18: boolean;
  } = {
    email: '',
    over18: false
  };

  return (
    <Stack>
      <FormHelperText style={{ textAlign: onlyXS ? 'center' : undefined }}>
        Sign up to receive updates about Code for Life games and teaching resources.
      </FormHelperText>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: to call backend
          setSubmitting(false);
        }}
      >
        <EmailField
          required
          placeholder='Your email address'
          helperText='Enter email address above'
        />
        <Stack
          spacing='auto'
          direction={onlyXS ? 'column' : 'row'}
          alignItems='center'
        >
          <CheckboxField
            required
            name='over18'
            formControlLabelProps={{
              label: 'Please confirm that you are over 18.'
            }}
            marginBottom={onlyXS ? undefined : 0}
          />
          <SubmitButton
            stackProps={{ width: onlyXS ? '100%' : undefined }}
            style={{ width: onlyXS ? '100%' : undefined }}
          >
            Sign up
          </SubmitButton>
        </Stack>
      </Form>
    </Stack>
  );
};

export default SignUp;
