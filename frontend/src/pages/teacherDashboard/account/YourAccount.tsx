import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import {
  ErrorOutlineOutlined,
  LockOutlined,
  PersonOutline
} from '@mui/icons-material';
import * as yup from 'yup';

import {
  EmailField,
  Form,
  PasswordField,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import Setup2fa from './2fa/setup2fa/Setup2fa';
import BackupTokens from './2fa/backupTokens/BackupTokens';
import { paths } from '../../../app/router';
import DeleteAccountForm from '../../../features/deleteAccountForm/DeleteAccountForm';

const TwoFactorAuthentication: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack>
      <Typography variant="h5">Two factor authentication</Typography>
      <Typography>
        Use your smartphone or tablet to enhance your account&apos;s security by
        using an authenticator app.
      </Typography>
      <Button
        onClick={() => { navigate(paths.teacher.dashboard.account.setup2FA._); }}
        sx={{ marginTop: theme.spacing(3) }}
      >
        Setup two factor authentication
      </Button>
      <Grid container>
        <Grid sm={6} marginTop={theme.spacing(4)}>
          <Typography variant="h6">Backup tokens</Typography>
          <Typography>
            If you don&apos;t have your smartphone or tablet with you, you can access your account using backup tokens.
            You have 0 backup tokens remaining.
          </Typography>
          <Typography>View and create backup tokens for your account.</Typography>
          <Button
            className='body'
            onClick={() => { navigate(paths.teacher.dashboard.account.backupTokens._); }}
            sx={{ marginTop: theme.spacing(3) }}
          >
            Manage backup tokens
          </Button>
          <Typography
            variant="body2"
            fontWeight="bold"
            color="error"
            mb={0}
          >
            Note: Please make sure that you store any login details in a secure place.
          </Typography>
        </Grid>
        <Grid sm={6} marginTop={theme.spacing(4)}>
          <Typography variant="h6">Disable two factor authentication (2FA)</Typography>
          <Typography>
            We recommend you to continue using 2FA, however you can disable 2FA for your account using the button below.
          </Typography>
          <Button
            // TODO: call backend and show confirmation popup
            className='alert'
            endIcon={<ErrorOutlineOutlined />}
            sx={{ marginTop: theme.spacing(3) }}
          >
            Disable 2FA
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

const YourAccountForm: React.FC = () => {
  interface Values {
    firstName: string;
    lastName: string;
    email: string;
    newPassword: string;
    repeatPassword: string;
    currentPassword: string;
  }

  const initialValues: Values = {
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
    currentPassword: ''
  };

  const theme = useTheme();

  return (
    <Form
      initialValues={initialValues}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            name="firstName"
            helperText="Enter your first name"
            placeholder="First name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonOutline />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            placeholder="Last name"
            helperText="Enter your last name"
            name="lastName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonOutline />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <EmailField
            placeholder="New email address (optional)"
            helperText="Enter your new email address (optional)"
            name="newEmail"
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <PasswordField
              placeholder="New password (optional)"
              helperText="Enter your new password (optional)"
              name="newPassword"
              repeat={[
                {
                  name: 'repeatPassword',
                  placeholder: 'Confirm new password (optional)',
                  helperText: 'Confirm your new password (optional)'
                }
              ]}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <PasswordField
            placeholder="Current password"
            helperText="Enter your current password"
            name="currentPassword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlined />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <SubmitButton sx={{ marginTop: theme.spacing(3) }}>Update details</SubmitButton>
    </Form>
  );
};

const YourAccount: React.FC = () => {
  const theme = useTheme();

  const params = tryValidateSync(
    useParams(),
    yup.object({
      view: yup.string()
        .oneOf([
          'setup-2fa',
          'backup-tokens'
        ] as const)
    })
  );

  if (params?.view === undefined) {
    return <>
      <Page.Section>
        <Typography align="center" variant="h4">
          Your account
        </Typography>
        <Typography>You can update your account details below.</Typography>
        <YourAccountForm />
      </Page.Section>
      <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
        <TwoFactorAuthentication />
      </Page.Section>
      <Page.Section>
        <DeleteAccountForm userType='teacher' />
      </Page.Section>
    </>;
  }

  switch (params.view) {
    case 'setup-2fa':
      return <Setup2fa />;
    case 'backup-tokens':
      return <BackupTokens />;
  }
};

export default YourAccount;
