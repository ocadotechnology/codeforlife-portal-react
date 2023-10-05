import React from 'react';
import { SubmitButton } from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import { Link, Typography, useTheme } from '@mui/material';
import { CflHorizontalForm } from '../../../../../../components/form/CflForm';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import CflPasswordFields from '../../../../../../features/cflPasswordFields/CflPasswordFields';
import {
  useEditStudentNameMutation,
  useEditStudentPasswordMutation,
  useGetStudentsByAccessCodeQuery
} from '../../../../../../app/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '../../../../../../app/router';

const UpdateNameForm: React.FC = () => {
  const location = useLocation();
  const studentId = new URLSearchParams(location.search).get('studentIds') ?? '';
  interface Values {
    name: string;
  }

  const initialValues: Values = {
    name: ''
  };

  const [editStudentName] = useEditStudentNameMutation();
  const navigate = useNavigate();
  return (
    <CflHorizontalForm
      header="Update name"
      subheader="Remember this is the name they use to log in with, so you should tell them what you've changed it to."
      initialValues={initialValues}
      onSubmit={(values) => {
        editStudentName({ name: values.name, studentId })
          .unwrap()
          .then((response: any) => {
            const path = location.pathname + location.search;
            navigate(path,
              {
                state: {
                  notifications: [
                    { index: 0, props: { children: 'You successfully updated your student details' } }
                  ]
                }
              }
            );
          }
          )
          .catch((error) => {
            console.error(error);
            const path = location.pathname + location.search;
            navigate(path,
              {
                state: {
                  notifications: [
                    { index: 0, props: { children: error.data.message } }
                  ]
                }
              }
            );
          }).finally(() => {
            scrollTo(0, 0);
          });
      }}
      submitButton={<SubmitButton> Update</SubmitButton>}
    >
      <StudentNameField />
    </CflHorizontalForm >
  );
};


interface ResponseData {
  access_code: string;
}
const UpdatePasswordForm: React.FC = () => {
  const [editStudentPassword] = useEditStudentPasswordMutation();
  const location = useLocation();
  console.log(location);
  const studentId = new URLSearchParams(location.search).get('studentIds') ?? '';
  interface Values {
    password: string;
    confirmPassword: string;
  }

  const initialValues: Values = {
    password: '',
    confirmPassword: ''
  };
  const navigate = useNavigate();
  const handleSubmit: (values: Values) => void = (values) => {
    editStudentPassword({
      password: values.password,
      studentId,
      confirmPassword: values.confirmPassword
    })
      .unwrap()
      .then((response) => {
        const path = paths.teacher.dashboard.classes.editClass.updatedStudentCredentials._;
        const { accessCode } = response;
        console.log(response, path, accessCode);

        navigate(
          path.replace(':accessCode', accessCode), // tried using generatePath but it says it is missing :accessCode 02/10/2023 22:32
          { state: { updatedStudentCredentials: response } }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <CflHorizontalForm
      header="Update password"
      subheader="You can set this student's password. Setting the password will also regenerate their direct access link.\nEnter and confirm the password in the boxes below. Try to prevent others from being able to guess the new password when making this decision."
      initialValues={initialValues}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      submitButton={<SubmitButton>Update</SubmitButton>}
    >
      <CflPasswordFields userType="student" repeatPasswordName="confirmPassword" />
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
  // use cache to get student name
  const { students } = useGetStudentsByAccessCodeQuery({ accessCode: '' }, {
    selectFromResult: ({ data }) => ({
      students: data?.studentsPerAccessCode
    })
  });
  const findCurrentStudent = students?.find((student) => student.id === studentId);
  const studentName = findCurrentStudent?.newUser.firstName;

  return (
    <>
      <Page.Section style={{ paddingBottom: theme.spacing(1.5) }}>
        <Typography
          align="center"
          variant="h4"
          marginBottom={theme.spacing(11.5)}
        >
          Edit student details for {studentName} from class Class 1 ({accessCode})
        </Typography>
        <Link className="back-to" onClick={goBack}>
          Class
        </Link>
        <Typography mb={0}>
          Edit this student&apos;s name and manage their password and direct access link.
        </Typography>
      </Page.Section>
      <Page.Section style={{ paddingTop: theme.spacing(1) }}>
        <UpdateNameForm />
      </Page.Section>
      <Page.Section style={{ paddingTop: theme.spacing(0.5) }}>
        <UpdatePasswordForm />
      </Page.Section>
    </>
  );
};

export default EditStudent;
