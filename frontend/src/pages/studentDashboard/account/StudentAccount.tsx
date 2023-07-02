import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import {
  LockOutlined,
  PersonOutline
} from '@mui/icons-material';

import Page from 'codeforlife/lib/esm/components/page';
import {
  EmailField,
  Form,
  PasswordField,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';

import DeleteAccountForm from '../../../features/DeleteAccountForm';
import { paths } from '../../../app/router';

const AccountFormPasswordFields: React.FC = () => {
  return <>
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
  </>;
};

const AccountFormButtons: React.FC<{
  goBack: () => void
}> = ({ goBack }) => {
  return <>
    <Stack direction='row' spacing={2}>
      <Button
        variant='outlined'
        onClick={goBack}
      >
        Cancel
      </Button>
      <SubmitButton>
        { /* TODO: Connect to backend */}
        Update details
      </SubmitButton>
    </Stack>
  </>;
};

const AccountForm: React.FC<{
  isDependent: boolean;
  goBack: () => void;
}> = ({
  isDependent,
  goBack
}) => {
    if (isDependent) {
      interface Values {
        newPassword: string;
        repeatPassword: string;
        currentPassword: string;
      }

      const initialValues: Values = {
        newPassword: '',
        repeatPassword: '',
        currentPassword: ''
      };

      return (
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Grid container spacing={2}>
            <AccountFormPasswordFields />
          </Grid>
          <AccountFormButtons goBack={goBack} />
        </Form>
      );
    } else {
      interface Values {
        name: string;
        email: string;
        newPassword: string;
        repeatPassword: string;
        currentPassword: string;
      }

      const initialValues: Values = {
        name: '',
        email: '',
        newPassword: '',
        repeatPassword: '',
        currentPassword: ''
      };

      return (
        <Form
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                helperText="Enter your name"
                placeholder="Name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EmailField
                placeholder="New email address (optional)"
                helperText="Enter your new email address (optional)"
                name="newEmail"
              />
            </Grid>
            <AccountFormPasswordFields />
          </Grid>
          <AccountFormButtons goBack={goBack} />
        </Form>
      );
    }
  };

const StudentAccount: React.FC<{
  isDependent: boolean,
  goBack: () => void
}> = ({ isDependent, goBack }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Page.Section>
        {isDependent
          ? <>
            <Typography align='center' variant='h4'>Update your password</Typography>
            <Typography>You may edit your password below. It must be long enough and hard enough to stop your friends
              guessing it and stealing all of your hard work. Choose something memorable though.</Typography>
            <Typography>If you have any problems, ask a teacher to help you.</Typography>
          </>
          : <>
            <Typography align='center' variant='h4'>Update your account details</Typography>
            <Typography>You can update your account details below.</Typography>
            <Typography>Please note: If you change your email address, you will need to re-verify it. Please ensure your
              password is strong enough to be secure.</Typography>
          </>
        }
        <AccountForm isDependent={isDependent} goBack={goBack} />
      </Page.Section>
      {!isDependent
        ? <>
          <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
            <Typography variant='h5'>Join a school or club</Typography>
            <Typography>To find out about linking your Code For Life account with a school or club, click &apos;Join&apos;.</Typography>
            <Button onClick={() => { navigate(paths.student.dashboard.independent.joinSchool._); }}>
              Join
            </Button>
          </Page.Section>
          <Page.Section>
            <DeleteAccountForm />
          </Page.Section>
        </>
        : <></>
      }
    </>
  );
};

export default StudentAccount;
