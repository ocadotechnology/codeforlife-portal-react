import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Button, Link, Typography } from '@mui/material';
import { paths } from '../../../../../../app/router';
import { CflHorizontalForm } from '../../../../../../components/form/CflForm';
import CflPasswordFields from '../../../../../../components/CflPasswordFields';
import StudentNameField from '../../../../../../components/form/StudentNameField';

const UpdateNameForm: React.FC = (): JSX.Element => {
  interface Values {
    name: string;
  }

  // TODO: Initial value should be student name
  const initialValues: Values = {
    name: ''
  };
  return (
    <CflHorizontalForm
      header="Update name"
      subheader="Remember this is the name they use to log in with, so you should tell them what you've changed it to."
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect to backend
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      submitButton={
        <Button type="submit">
          Update
        </Button>
      }
    >
      <StudentNameField/>
    </CflHorizontalForm>
  );
};

const UpdatePasswordForm: React.FC = (): JSX.Element => {
  interface Values {
    password: string;
    confirmPassword: string;
  }

  const initialValues: Values = {
    password: '',
    confirmPassword: ''
  };
  return (
    <CflHorizontalForm
      header="Update password"
      subheader="You can set this student's password. Setting the password will also regenerate their direct access link. Enter and confirm the password in the boxes below. Try to prevent others from being able to guess the new password when making this decision."
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: Connect to backend
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
      submitButton={
        <Button type="submit">
          Update
        </Button>
      }
    >
      <CflPasswordFields userType='student' />
    </CflHorizontalForm>
  );
};

const EditStudent: React.FC = (): JSX.Element => {
  return (
    <Page.Section>
      <Typography align="center" variant="h4">
        {/* TODO: Plugin user data */}
        Edit student details for Florian from class Awesome class (AW123)
      </Typography>
      {/* TODO: Update path */}
      <Link href={paths.teacher.dashboard.classes._} color="inherit" className="body">
        &lt; Back to Edit class
      </Link>
      <Typography>
        Edit this student&apos;s name and manage their password and direct access link.
      </Typography>
      <UpdateNameForm />
      <UpdatePasswordForm />
    </Page.Section>
  );
};

export default EditStudent;
