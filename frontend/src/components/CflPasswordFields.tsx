import React from 'react';
import {
  Typography,
  Stack
} from '@mui/material';
import {
  Circle as CircleIcon
} from '@mui/icons-material';
import * as Yup from 'yup';

import {
  PasswordField
} from 'codeforlife/lib/esm/components/form';

export interface CflPasswordFieldsProps {
  userType: 'teacher' | 'independent' | 'student'
}

const CflPasswordFields: React.FC<CflPasswordFieldsProps> = ({
  userType
}) => {
  const [password, setPassword] = React.useState('');

  // TODO: Load from central storage.
  const mostUsed = ['Abcd1234', 'Password1', 'Qwerty123'];

  function isStrongPassword(password: string): boolean {
    if (userType === 'teacher') {
      return (password.length >= 10 &&
        !(
          password.search(/[A-Z]/) === -1 ||
          password.search(/[a-z]/) === -1 ||
          password.search(/[0-9]/) === -1 ||
          password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1
        ));
    } else if (userType === 'independent') {
      return (password.length >= 8 &&
        !(
          password.search(/[A-Z]/) === -1 ||
          password.search(/[a-z]/) === -1 ||
          password.search(/[0-9]/) === -1
        ));
    } else {
      return password.length >= 6;
    }
  }

  let status: { name: string, color: string };
  if (password === '') {
    status = { name: 'No password!', color: '#FF0000' };
  } else if (mostUsed.includes(password)) {
    status = { name: 'Password too common!', color: '#DBA901' };
  } else if (isStrongPassword(password)) {
    status = { name: 'Strong password!', color: '#088A08' };
  } else {
    status = { name: 'Password too weak!', color: '#DBA901' };
  }

  return <>
    <PasswordField
      required
      placeholder='Password'
      helperText='Enter a password'
      validate={Yup
        .string()
        .required()
        .test(
          'independent-password-strength-check',
          'Invalid password',
          (password) => {
            setPassword(password);
            return isStrongPassword(password);
          }
        )
      }
      repeat={[
        {
          name: 'repeatPassword',
          placeholder: 'Repeat password',
          helperText: 'Repeat password'
        }
      ]}
    />
    <Stack direction='row' justifyContent='center'>
      <CircleIcon
        htmlColor={status.color}
        stroke='white'
        strokeWidth={1}
      />
      <Typography
        fontSize={18}
        fontWeight={500}
        margin={0}
      >
        &nbsp;&nbsp;{status.name}
      </Typography>
    </Stack>
  </>;
};

export default CflPasswordFields;
