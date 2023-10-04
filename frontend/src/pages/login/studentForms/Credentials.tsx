import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import React from 'react';
import {
  useNavigate,
  useParams
} from 'react-router-dom';
import * as Yup from 'yup';

import { tryValidateSync } from 'codeforlife/lib/esm/helpers/yup';

import { accessCodeSchema } from '../../../app/schemas';
import LoginForm from '../LoginForm';

import {
  PasswordField,
  SubmitButton,
  TextField
} from 'codeforlife/lib/esm/components/form';
import { ContainerState } from 'codeforlife/lib/esm/components/page';

import { paths } from '../../../app/router';

const Credentials: React.FC = () => {
  const navigate = useNavigate();

  const params = tryValidateSync(
    useParams(),
    Yup.object({ accessCode: accessCodeSchema.required() })
  );

  if (params === undefined) {
    const state: ContainerState = {
      notifications: [
        {
          props: {
            error: true,
            children: 'Please provide a valid access code for your class.'
          }
        }
      ]
    };
    navigate(paths.login.student._, { state });
    return <></>;
  }

  return (
    <LoginForm
      themedBoxProps={{ userType: 'student' }}
      header={`Welcome to class: ${params.accessCode}`}
      subheader='Please enter your login details.'
      initialValues={{
        username: '',
        password: '',
        classId: params.accessCode
      }}
      onSubmit={() => ({
        navigateTo: paths.student.dashboard.dependent._,
        isEnd: true
      })}
    >
      <TextField
        name='username'
        placeholder='Username'
        helperText='Enter your username'
        required
      />
      <PasswordField
        placeholder='Password'
        helperText='Enter your password'
        required
      />
      <SubmitButton
        stackProps={{ alignItems: 'end' }}
        endIcon={<ChevronRightIcon />}
      >
        Log in
      </SubmitButton>
    </LoginForm>
  );
};

export default Credentials;
