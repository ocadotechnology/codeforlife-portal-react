import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
import { useDisable2faMutation, useLogoutMutation, useTeacherHas2faQuery, useUpdateTeacherAccountDetailsMutation } from '../../../app/api';

const UserDoesNotHave2fa: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  return <>
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
  </>;
};

const UserHas2fa: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [disable2fa] = useDisable2faMutation();
  const { refetch } = useTeacherHas2faQuery(null);
  const handleDisable2fa: () => void = () => {
    disable2fa(null).unwrap().then(refetch).catch((error) => {
      console.error(error);
    }
    );
  };
  return <Grid container>
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
        sx={{ marginTop: theme.spacing(3) }}
      >
        Note: Please make that you store any login details in a secure place.
      </Typography>
    </Grid>
    <Grid sm={6} marginTop={theme.spacing(4)}>
      <Typography variant="h6">Disable two factor authentication (2FA)</Typography>
      <Typography>
        We recommend you to continue using 2FA, however you can disable 2FA for your account using the button below.
      </Typography>
      <Button
        // TODO: call backend and show confirmation popup
        onClick={handleDisable2fa}
        className='alert'
        endIcon={<ErrorOutlineOutlined />}
        sx={{ marginTop: theme.spacing(3) }}
      >
        Disable 2FA
      </Button>
    </Grid>
  </Grid>;
};

const TwoFactorAuthentication: React.FC = () => {
  const { data = { has2fa: false }, isLoading } = useTeacherHas2faQuery(null);
  const { has2fa } = data;
  return (
    <Stack>
      {isLoading ? null : has2fa ? <UserHas2fa /> : <UserDoesNotHave2fa />}
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

  // TODO: prefill firstname and lastname
  // from the getUser endpoint in the backend
  const initialValues: Values = {
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
    currentPassword: ''
  };

  const theme = useTheme();
  const [updateTeacherAccount] = useUpdateTeacherAccountDetailsMutation();
  const [logoutUser] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Form
      initialValues={initialValues}
      onSubmit={values => {
        const messages: Array<{
          index: number;
          props: { children: string; };
        }> = [];
        if (values.email) {
          messages.push({
            index: messages.length,
            props: {
              children:
                'Your email will be changed once you have verified it, until then you can still log in with your old email.'
            }
          });
        }
        if (values.newPassword) {
          messages.push({
            index: messages.length,
            props: {
              children:
                'Please login using your new password.'
            }
          });
        }
        updateTeacherAccount(values).unwrap().then(() => {
          if (values.newPassword || values.email) {
            logoutUser(null).unwrap().then(() => {
              navigate(paths.login.teacher._, { state: { notifications: messages } });
            }).catch((error) => {
              console.error(error);
            }
            );
          }
          if (values.firstName || values.lastName) {
            navigate(location.pathname, {
              state: {
                notifications: [
                  {
                    index: 0,
                    props: {
                      children: 'Your account details have been successfully changed.'
                    }
                  }
                ]
              }
            });
          }
        }).catch((error) => {
          console.error(error);
          navigate(location.pathname, {
            state: {
              notifications: [
                {
                  index: 0,
                  props: {
                    children: 'Your account details were not updated due to incorrect details'
                  }
                }
              ]
            }
          });
        }
        );
      }
      }
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
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
            required
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
            required
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
