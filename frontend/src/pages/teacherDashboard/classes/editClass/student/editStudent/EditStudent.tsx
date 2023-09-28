import { SubmitButton } from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import React from 'react';

import { Link, Typography, useTheme } from '@mui/material';
import * as yup from 'yup';

import { CflHorizontalForm } from '../../../../../../components/form/CflForm';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import CflPasswordFields from '../../../../../../features/cflPasswordFields/CflPasswordFields';
import { fromSearchParams } from 'codeforlife/lib/esm/hooks';
import { useEditStudentNameMutation, useEditStudentPasswordMutation } from '../../../../../../app/api';
import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../../../../../app/router';

const UpdateNameForm: React.FC = () => {
  interface Values {
    name: string;
    studentId: string;
  }

  // TODO: Initial value should be student name
  const studentId = tryValidateSync(
    fromSearchParams(),
    yup.object({
      studentIds: yup.string().required()
    })
  );

  const studentEditId = studentId?.studentIds ?? '0';
  const initialValues: Values = {
    name: 'Florian',
    studentId: studentEditId
  };
  const [editStudentName] = useEditStudentNameMutation();
  return (
    <CflHorizontalForm
      header="Update name"
      subheader="Remember this is the name they use to log in with, so you should tell them what you've changed it to."
      initialValues={initialValues}
      onSubmit={(values) => {
        editStudentName({ name: values.name, studentId: studentEditId })
          .unwrap().then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }}

      // TODO: Disable button by default
      submitButton={< SubmitButton > Update</SubmitButton >}
    >
      <StudentNameField />
    </CflHorizontalForm >
  );
};

const UpdatePasswordForm: React.FC<{ accessCode: string; }> = (accessCode) => {
  const [editStudentPassword] = useEditStudentPasswordMutation();
  interface Values {
    password: string;
    confirmPassword: string;
  }

  const initialValues: Values = {
    password: '',
    confirmPassword: ''
  };
  const navigate = useNavigate();
  const studentId = tryValidateSync(
    fromSearchParams(),
    yup.object({
      studentIds: yup.string().required()
    })
  );
  const studentEditId = studentId?.studentIds ?? '0';
  const handleSubmit: (values: Values) => void = (values) => {
    editStudentPassword({ password: values.password, studentId: studentEditId, confirmPassword: values.confirmPassword }).unwrap().then((response) => {
      console.log(response);
      navigate(generatePath(paths.teacher.dashboard.classes.editClass.updatedStudentCredentials._, accessCode), { state: { updatedStudentCredentials: response } });
    }).catch((error) => {
      console.error(error);
    }
    );
  };

  return (
    <CflHorizontalForm
      header="Update password"
      subheader="You can set this student's password. Setting the password will also regenerate their direct access link.\nEnter and confirm the password in the boxes below. Try to prevent others from being able to guess the new password when making this decision."
      initialValues={initialValues}
      onSubmit={(values) => { handleSubmit(values); }}
      submitButton={<SubmitButton>Update</SubmitButton>}
    >
      <pre>
        <code>
          {JSON.stringify(location, null, 2)}
        </code>
      </pre>
      <CflPasswordFields userType="student" repeatPasswordName='confirmPassword' />
    </CflHorizontalForm>
  );
};

const EditStudent: React.FC<{
  accessCode: string;
  // TODO: Get actual ID from backend in previous page and use it to populate page data
  studentId: number;
  goBack: () => void;
}> = ({ accessCode, studentId, goBack }) => {
  const theme = useTheme();
  const location = useLocation();
  const resettingPassword = location.state?.updatedStudentCredentials;
  return (
    <>
      <Page.Section style={{ paddingBottom: theme.spacing(1.5) }}>
        <Typography
          align="center"
          variant="h4"
          marginBottom={theme.spacing(11.5)}
        >
          Edit student details for Florian from class Class 1 ({accessCode})
        </Typography>
        <Link className="back-to" onClick={goBack}>
          Class
        </Link>
        <Typography mb={0}>
          Edit this student&apos;s name and manage their password and direct
          access link.
        </Typography>
      </Page.Section>
      <Page.Section style={{ paddingTop: theme.spacing(1) }}>
        <UpdateNameForm />
      </Page.Section>
      <Page.Section style={{ paddingTop: theme.spacing(0.5) }}>
        <UpdatePasswordForm accessCode={accessCode} />
      </Page.Section>
    </>
  );
};

export default EditStudent;
