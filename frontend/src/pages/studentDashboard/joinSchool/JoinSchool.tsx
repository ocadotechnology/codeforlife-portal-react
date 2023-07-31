import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Stack,
  Typography
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';
import {
  Form,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';

import { accessCodeSchema } from '../../../app/schemas';

const JoinSchool: React.FC = () => {
  const navigate = useNavigate();

  interface Values {
    accessCode: string;
  }

  const initialValues: Values = {
    accessCode: ''
  };

  const [requestSent, setRequestSent] = React.useState(false);

  return (
    <Page.Section>
      <Typography align='center' variant='h4'>Join a school or club</Typography>
      {requestSent
        ? <>
          <Typography variant='h5'>Request pending</Typography>
          { /* TODO: Fetch actual values from backend. */}
          <Typography>Your request to join class AB123 in the school or club Code for Life School is still pending.</Typography>
          <Typography>The teacher for that class must review and approve the request to complete the process.</Typography>
          <Typography>If successful, the teacher will then contact you with your new login details.</Typography>
          <Typography><strong>Warning:</strong> once the teacher accepts you to their class, that teacher and the school
            or club will manage your account.</Typography>
          <Typography>You may cancel your request now, before the teacher makes their decision.</Typography>

          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              onClick={() => { navigate(-1); }}
            >
              Back
            </Button>
            <Button onClick={() => {
              // TODO: Connect to backend
              setRequestSent(false);
            }}>
              Cancel request
            </Button>
          </Stack>
        </>
        : <>
          <Typography variant='h5'>Request to join a school or club</Typography>
          <Typography>If you want to link your Code For Life account with a school or club, ask a teacher to enable external
            requests and provide you with the Class Access Code for the class you want to join. Simply add the Class Access
            Code to the form below and submit.</Typography>
          <Typography><strong>Warning:</strong> once the teacher accepts you to their class, that teacher and the school or
            club will manage your account.</Typography>
          <Typography>If successful, the teacher will contact you with your new login details.</Typography>

          <Form
            initialValues={initialValues}
            onSubmit={() => {
              // TODO: Connect to backend
              setRequestSent(true);
            }}
          >
            <TextField
              placeholder="Class code"
              helperText="Enter class code"
              name="classCode"
              sx={{ width: { xs: '100%', sm: '50%' } }}
              validate={accessCodeSchema}
              required
            />

            <Stack direction='row' spacing={2} paddingY={3}>
              <Button
                variant='outlined'
                onClick={() => { navigate(-1); }}
              >
                Cancel
              </Button>
              <SubmitButton>
                Request
              </SubmitButton>
            </Stack>
          </Form>
        </>
      }
    </Page.Section>
  );
};

export default JoinSchool;
