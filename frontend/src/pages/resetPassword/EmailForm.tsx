import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Stack,
  Button
} from '@mui/material';

import {
  Form,
  EmailField,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import {
  Image
} from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import PaperPlaneImg from '../../images/paper_plane.png';

const EmailForm: React.FC = () => {
  const navigate = useNavigate();
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
        Thank you
      </Typography>
      <Image
        alt='sent request'
        src={PaperPlaneImg}
        maxWidth='100px'
        my={5}
      />
      <Typography>
        If you have entered a valid email address, you will receive a link enabling you to reset your password.
      </Typography>
      <Button onClick={() => { navigate(paths._); }}>
        Back to homepage
      </Button>
    </Stack>
    : <Stack gap={1}>
      <Typography textAlign='center' variant='h4'>
        Reset password
      </Typography>
      <Typography textAlign='center' variant='h5'>
        Please enter your email address
      </Typography>
      <Typography>
        We will send an email with a link to reset your password.
      </Typography>
      <Form
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          // TODO: Connect this to the backend
          console.log(values);
          setSubmitting(false);
          setDidSubmit(true);
        }}
      >
        <EmailField
          placeholder='Email address'
          helperText='Enter your email address'
          required
        />
        <Stack
          direction='row'
          gap={5}
          justifyContent='center'
        >
          <Button
            variant='outlined'
            onClick={() => { navigate(-1); }}
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

export default EmailForm;
