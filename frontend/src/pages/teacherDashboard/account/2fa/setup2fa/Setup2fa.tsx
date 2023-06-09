import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';
import { Form, SubmitButton, TextField } from 'codeforlife/lib/esm/components/form';
import { paths } from '../../../../../app/router';
import { Image } from 'codeforlife/lib/esm/components';
import cflLogo from '../../../../../images/cfl_logo.png';
import * as Yup from 'yup';
import Page from 'codeforlife/lib/esm/components/page';

interface Setup2faFormValues {
  token: string;
}

const initialValues: Setup2faFormValues = {
  token: ''
};

const Setup2fa: React.FC = () => {
  const navigate = useNavigate();
  const [setupComplete, setSetupComplete] = React.useState<boolean>(false);

  return (
    <Page.Section>
      {setupComplete
        ? <>
          <Typography align="center" variant="h4">
            Two-factor authentication set up complete
          </Typography>
          <Typography>
            You have successfully set up 2FA. 🎉
          </Typography>
          <Typography>
            You will now need to use your code generator the next time you log in.
          </Typography>
          <Button onClick={() => { navigate(paths.teacher.dashboard.account._); }}>
            OK
          </Button>
        </>
        : <>
          <Typography align="center" variant="h4">
            Two-factor authentication
          </Typography>
          <Typography>
            Two-factor authentication is not currently set up on your account. Enable two-factor authentication (2FA) for
            enhanced account security.
          </Typography>
          <Typography>
            To start using a token generator, please use your smartphone to scan the QR code below. For example, use
            Google Authenticator.
          </Typography>
          <Image
            alt='QR code'
            // TODO: Replace image with generated QR code from backend library
            src={cflLogo}
            maxWidth='230px'
          />
          <Form
            initialValues={initialValues}
            onSubmit={(values, { setSubmitting }) => {
              // TODO: to call backend
              setSubmitting(false);
            }}>
            <TextField
              required
              name="token"
              helperText="Enter token generated by app"
              validate={Yup
                .string()
                .matches(/^[0-9]{6}$/, 'Invalid token')
              }
              sx={{ maxWidth: '230px' }}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant='outlined'
                onClick={() => { navigate(paths.teacher.dashboard.account._); }}
              >
                Cancel
              </Button>
              <SubmitButton
                // TODO: Remove href and replace with submit functionality
                onClick={() => { setSetupComplete(true); }}
              >
                Next
              </SubmitButton>
            </Stack>
          </Form>
        </>
      }
    </Page.Section>
  );
};

export default Setup2fa;
