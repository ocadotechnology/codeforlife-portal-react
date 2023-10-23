import { Link, Typography, useTheme } from '@mui/material';
import React from 'react';

import {
  Form,
  SubmitButton
} from 'codeforlife/lib/esm/components/form';
import Page from 'codeforlife/lib/esm/components/page';
import { submitForm } from 'codeforlife/lib/esm/helpers/formik';
import { useNavigate } from 'codeforlife/lib/esm/hooks';

import {
  useRetrieveClassQuery,
  useRetrieveUserQuery,
  useUpdateUserMutation
} from '../../../../../../app/api';
import { paths } from '../../../../../../app/router';
import StudentNameField from '../../../../../../components/form/StudentNameField';
import CflPasswordFields from '../../../../../../features/cflPasswordFields/CflPasswordFields';
import { StudentCredentialsState } from './StudentCredentials';

interface EditStudentProps {
  id: number;
  accessCode: string;
  goBack: () => void;
}

const EditStudent: React.FC<EditStudentProps> = ({
  id,
  accessCode,
  goBack
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const user = useRetrieveUserQuery({ id });
  const klass = useRetrieveClassQuery({ accessCode });

  return <>{user.data !== undefined && klass.data !== undefined && <>
    <Page.Section style={{ paddingBottom: theme.spacing(1.5) }}>
      <Typography
        align="center"
        variant="h4"
        marginBottom={theme.spacing(11.5)}
      >
        Edit student details
        for {user.data.firstName}
        from class {klass.data.name} ({klass.data.accessCode})
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
      {/* TODO: create global fix for margin bottom */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update name
      </Typography>
      <Typography>
        Remember this is the name they use to log in with, so you should tell
        them what you&apos;ve changed it to.
      </Typography>
      <Form
        initialValues={{ id, firstName: '' }}
        onSubmit={submitForm(updateUser, {
          then: () => {
            navigate(paths.teacher.dashboard.classes._, {
              state: {
                notifications: [
                  {
                    index: 1,
                    props: {
                      children: 'Student\'s details successfully updated.'
                    }
                  }
                ]
              }
            });
          }
        })}
      >
        <StudentNameField />
        <SubmitButton>
          Update
        </SubmitButton>
      </Form>
    </Page.Section>
    <Page.Section style={{ paddingTop: theme.spacing(0.5) }}>
      {/* TODO: create global fix for margin bottom */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Update password
      </Typography>
      <Typography>
        You can set this student&apos;s password. Setting the password will also
        regenerate their direct access link. Enter and confirm the password in
        the boxes below. Try to prevent others from being able to guess the new
        password when making this decision.
      </Typography>
      <Form
        initialValues={{ id, password: '' }}
        onSubmit={submitForm(updateUser, {
          then: (user) => {
            navigate<StudentCredentialsState>(
              paths.teacher.dashboard.classes.editClass.studentCredentials._,
              {
                state: {
                  notifications: [
                    {
                      index: 1,
                      props: {
                        children: 'Student\'s details successfully updated.'
                      }
                    }
                  ],
                  users: [user]
                }
              }
            );
          }
        })}
      >
        <CflPasswordFields
          userType="student"
          repeatPasswordName="confirmPassword"
        />
        <SubmitButton>
          Update
        </SubmitButton>
      </Form>
    </Page.Section>
  </>}</>;
};

export default EditStudent;
