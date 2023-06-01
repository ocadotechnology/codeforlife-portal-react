import React from 'react';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';

import {
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import CflPasswordFields from '../../components/CflPasswordFields';
import ConfirmationTickImage from '../../images/confirmation_tick.png';

const PasswordForm: React.FC<{
  userType: 'teacher' | 'independent';
  token: string;
}> = ({ userType, token }) => {
  const [didSubmit, setDidSubmit] = React.useState(false);

  interface Values {
    email: string;
  }

  const initialValues: Values = {
    email: ''
  };

  return (didSubmit)
    ? <Stack gap={1} alignItems='center'>
      <Typography textAlign='center' variant='h4'>
        Your password has been reset
      </Typography>
      <Image
        alt='password successfully reset'
        src={ConfirmationTickImage}
        maxWidth='125px'
        my={5}
      />
      <Typography>
        Please log in.
      </Typography>
      <Button href={
        userType === 'teacher'
          ? paths.login.teacher._
          : paths.login.independent
      }>
        OK
      </Button>
    </Stack>
    : <Stack gap={1}>
      <Typography textAlign='center' variant='h4'>
        Reset password
      </Typography>
      <Typography>
        Please enter a new password and confirm it in the box below to reset your account’s password.
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: connect this to the backend
          console.log(values);
          setSubmitting(false);
          setDidSubmit(true);
        }}
      >
        <CflPasswordFields userType={userType} />
        <Stack
          mt={3}
          direction='row'
          gap={5}
          justifyContent='center'
        >
          <Button
            className='cancel'
            href={paths.home}
          >
            Cancel
          </Button>
          <SubmitButton>
            Reset password
          </SubmitButton>
        </Stack>
      </Form>
    </Stack>;
};

export default PasswordForm;
