import React from 'react';
import BasePage from 'pages/BasePage';
import DashboardBanner from './DashboardBanner';
import DashboardHeader from './DashboardHeader';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import {
  DELETE_ACCOUNT_INITIAL_VALUES,
  UPDATE_TEACHER_ACCOUNT_INITIAL_VALUES
} from './constants';
import {
  DELETE_ACCOUNT_SCHEMA,
  UPDATE_TEACHER_ACCOUNT_SCHEMA
} from './schemas';
import { DeleteOutline } from '@mui/icons-material';
import { getUser } from './dummyMethods';
import CflField from 'components/formik/CflField';
import CflTextField from 'components/formik/CflTextField';
import CflCheckboxField from 'components/formik/CflCheckboxField';

const TwoFactorAuthentication: React.FC = (): JSX.Element => {
  return (
    <Stack>
      <Typography variant="h5">Two factor authentication</Typography>
      <Typography>
        Use your smartphone or tablet to enhance your accont&apos;s security by
        using an authenticator app.
      </Typography>
      <Button variant="contained" color="tertiary">
        Setup two factor authentication
      </Button>
    </Stack>
  );
};

const YourAccountForm: React.FC = () => {
  const { firstName, lastName } = getUser();

  return (
    <Formik
      initialValues={{
        ...UPDATE_TEACHER_ACCOUNT_INITIAL_VALUES,
        firstName,
        lastName
      }}
      validationSchema={UPDATE_TEACHER_ACCOUNT_SCHEMA}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form>
          <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={4}>
              <CflTextField
                name="firstName"
                helperText="Enter your first name"
                placeholder="First name"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Last name"
                helperText="Enter your last name"
                name="lastName"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="New email address (optional)"
                helperText="Enter your new email address (optional)"
                name="newEmail"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="New password (optional)"
                helperText="Enter your new password (optional)"
                name="newPassword"
                type="password"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Confirm new password (optional)"
                helperText="Confirm your new password (optional)"
                name="confirmPassword"
                type="password"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <CflTextField
                placeholder="Current password"
                helperText="Enter your current password"
                name="currentPassword"
                type="password"
                size="small"
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            variant="contained"
            color="tertiary"
            type="submit"
          >
            Update details
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const YourAccount: React.FC = (): JSX.Element => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center" variant="h5">
          Your account
        </Typography>
        <Typography>You can update your account details below</Typography>
      </Grid>
      <Grid item xs={12}>
        <YourAccountForm />
      </Grid>
    </Grid>
  );
};

const DeleteAccountForm: React.FC = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Formik
      initialValues={DELETE_ACCOUNT_INITIAL_VALUES}
      validationSchema={DELETE_ACCOUNT_SCHEMA}
      onSubmit={(formik, { setSubmitting }) => {
        alert(JSON.stringify(formik, null, 2));
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form>
          <Grid container direction="row" alignItems="flex-start">
            <Grid item xs={12} sm={4}>
              <CflTextField
                name="password"
                label="Current password"
                helperText="Enter your current password"
                type="password"
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <CflCheckboxField
                name="removeFromNewsletter"
                sx={{ color: theme.palette.info.dark }}
                required
                formControlLabelProps={{
                  label: 'Remove me from the Code for Life newsletter'
                }}
              />
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button
            disabled={formik.isSubmitting || !(formik.isValid && formik.dirty)}
            variant="contained"
            color="error"
            type="submit"
            endIcon={<DeleteOutline />}
          >
            Delete account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const DeleteAccount: React.FC = (): JSX.Element => {
  return (
    <Stack>
      <Typography variant="h5">Delete account</Typography>
      <Typography>
        If you no longer wish to have a Code for Life account, you can delete it
        by confirming below. You will receive an email to confirm this decision.
      </Typography>
      <Typography fontWeight="bold">
        This can&apos;t be reversed. All classes you&apos;ve created will be
        permanently erased.
      </Typography>
      <DeleteAccountForm />
    </Stack>
  );
};

const TeacherAccount: React.FC = (): JSX.Element => {
  return (
    <BasePage>
      <DashboardBanner />
      <DashboardHeader page="Your account" />
      <Container>
        <YourAccount />
        <TwoFactorAuthentication />
        <DeleteAccount />
      </Container>
    </BasePage>
  );
};

export default TeacherAccount;
