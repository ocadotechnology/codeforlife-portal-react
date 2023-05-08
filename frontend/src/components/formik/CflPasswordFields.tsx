import React from 'react';
import {
  Typography,
  Stack,
  InputAdornment
} from '@mui/material';
import {
  Circle as CircleIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

import CflTextField, { CflTextFieldProps } from './CflTextField';

export function isStrongPassword(
  password: string,
  { forTeacher }: { forTeacher: boolean }
): boolean {
  return (forTeacher)
    ? (password.length >= 10 &&
      !(
        password.search(/[A-Z]/) === -1 ||
        password.search(/[a-z]/) === -1 ||
        password.search(/[0-9]/) === -1 ||
        password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1
      ))
    : (password.length >= 8 &&
      !(
        password.search(/[A-Z]/) === -1 ||
        password.search(/[a-z]/) === -1 ||
        password.search(/[0-9]/) === -1
      ));
}

interface CflPasswordFieldProps extends Omit<CflTextFieldProps, (
  'type' |
  'onKeyUp' |
  'InputProps'
)> { }

export interface CflPasswordFieldsProps
  extends Omit<CflPasswordFieldProps, 'name'> {
  forTeacher: boolean,
  passwordFieldProps?: CflPasswordFieldProps,
  repeatPasswordFieldProps?: CflPasswordFieldProps
}

const CflPasswordFields: React.FC<CflPasswordFieldsProps> = ({
  forTeacher,
  passwordFieldProps = {
    name: 'password',
    placeholder: 'Password',
    helperText: 'Enter a password'
  },
  repeatPasswordFieldProps = {
    name: 'repeatPassword',
    placeholder: 'Repeat password',
    helperText: 'Repeat password'
  },
  ...commonPasswordFieldProps
}) => {
  const [password, setPassword] = React.useState('');

  // TODO: Load from central storage.
  const mostUsed = ['Abcd1234', 'Password1', 'Qwerty123'];

  let status: { name: string, color: string };
  if (password === '') {
    status = { name: 'No password!', color: '#FF0000' };
  } else if (mostUsed.includes(password)) {
    status = { name: 'Password too common!', color: '#DBA901' };
  } else if (isStrongPassword(password, { forTeacher })) {
    status = { name: 'Strong password!', color: '#088A08' };
  } else {
    status = { name: 'Password too weak!', color: '#DBA901' };
  }

  const inputProps: CflTextFieldProps['InputProps'] = {
    endAdornment: (
      <InputAdornment position='end'>
        <SecurityIcon />
      </InputAdornment>
    )
  };

  return <>
    <CflTextField
      type='password'
      InputProps={inputProps}
      onKeyUp={(event) => {
        setPassword((event.target as HTMLTextAreaElement).value);
      }}
      {...passwordFieldProps}
      {...commonPasswordFieldProps}
    />
    <CflTextField
      type='password'
      InputProps={inputProps}
      {...repeatPasswordFieldProps}
      {...commonPasswordFieldProps}
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
