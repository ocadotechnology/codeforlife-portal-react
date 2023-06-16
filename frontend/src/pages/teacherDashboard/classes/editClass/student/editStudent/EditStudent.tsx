import React from 'react';
import Page from 'codeforlife/lib/esm/components/page';
import { Link, Typography } from '@mui/material';
import { CflHorizontalForm } from '../../../../../../components/form/CflForm';
import CflPasswordFields from '../../../../../../components/CflPasswordFields';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import { SubmitButton } from 'codeforlife/lib/esm/components/form';

const UpdateNameForm: React.FC = () => {
  interface Values {
    name: string;
  }

  // TODO: Initial value should be student name
  const initialValues: Values = {
    name: 'Florian'
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
      // TODO: Disable button by default
      submitButton={
        <SubmitButton>Update</SubmitButton>
      }
    >
      <StudentNameField/>
    </CflHorizontalForm>
  );
};

const UpdatePasswordForm: React.FC = () => {
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
        <SubmitButton>Update</SubmitButton>
      }
    >
      <CflPasswordFields userType='student' />
    </CflHorizontalForm>
  );
};

const EditStudent: React.FC<{
  accessCode: string;
  // TODO: Get actual ID from backend in previous page and use it to populate page data
  studentId: number;
  goBack: () => void;
}> = ({
  accessCode,
  studentId,
  goBack
}) => {
  return (
    <Page.Section>
      <Typography align="center" variant="h4">
        Edit student details for Florian from class Class 1 ({accessCode})
      </Typography>
      <Link className='back-to' onClick={goBack}>
        Class
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
