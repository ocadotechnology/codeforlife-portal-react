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
import {
  useRequestTeacherPasswordResetMutation,
  useRequestIndependentStudentPasswordResetMutation
} from '../../app/api';
import PaperPlaneImg from '../../images/paper_plane.png';

interface EmailFormProps {
  userType: 'teacher' | 'independent'
}

const EmailForm: React.FC<EmailFormProps> = ({
  userType
}) => {
  const navigate = useNavigate();
  const [requestPasswordReset, result] = (userType === 'teacher'
    ? useRequestTeacherPasswordResetMutation
    : useRequestIndependentStudentPasswordResetMutation
  )();

  interface Values {
    email: string;
  }

  const initialValues: Values = {
    email: ''
  };

  return (result.isSuccess)
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
        onSubmit={requestPasswordReset}
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
