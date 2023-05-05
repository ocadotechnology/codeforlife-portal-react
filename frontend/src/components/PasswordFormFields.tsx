import React from 'react';
import {
  Typography,
  Stack,
  InputAdornment,
  TextField,
  TextFieldProps
} from '@mui/material';
import {
  Circle as CircleIcon,
  Security as SecurityIcon
} from '@mui/icons-material';

import FormField, { FormFieldProps } from './FormField';

const PASSWORD_STATUS = {
  NO_PWD: { name: 'No password!', colour: '#FF0000' },
  TOO_WEAK: { name: 'Password too weak!', colour: '#DBA901' },
  STRONG: { name: 'Strong password!', colour: '#088A08' },
  TOO_COMMON: { name: 'Password too common!', colour: '#DBA901' }
};

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

export interface PasswordFormFieldsProps {
  forTeacher: boolean,
  textFieldProps?: Omit<TextFieldProps, (
    'placeholder' |
    'helperText' |
    'type' |
    'onKeyUp' |
    'InputProps'
  )>,
  formFieldProps?: Omit<FormFieldProps, (
    'name' |
    'as'
  )>
}

const PasswordFormFields: React.FC<PasswordFormFieldsProps> = ({
  forTeacher, textFieldProps, formFieldProps
}) => {
  const [password, setPassword] = React.useState('');
  const [status, setStatus] = React.useState(PASSWORD_STATUS.NO_PWD);

  // TODO: Load from central storage.
  const mostUsed = ['Abcd1234', 'Password1', 'Qwerty123'];

  // TODO: use Yup to update password status
  React.useEffect(() => {
    if (password === '') {
      setStatus(PASSWORD_STATUS.NO_PWD);
    } else if (mostUsed.includes(password)) {
      setStatus(PASSWORD_STATUS.TOO_COMMON);
    } else if (isStrongPassword(password, { forTeacher })) {
      setStatus(PASSWORD_STATUS.STRONG);
    } else {
      setStatus(PASSWORD_STATUS.TOO_WEAK);
    }
  }, [password]);

  const endAdornment = (
    <InputAdornment position='end'>
      <SecurityIcon />
    </InputAdornment>
  );

  return <>
    <FormField
      name='password'
      as={() => <TextField
        placeholder='Password'
        helperText='Enter a password'
        type='password'
        InputProps={{ endAdornment }}
        onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => {
          setPassword((event.target as HTMLTextAreaElement).value);
        }}
        {...textFieldProps}
      />}
      {...formFieldProps}
    />
    <FormField
      name='repeatPassword'
      as={() => <TextField
        placeholder='Repeat password'
        helperText='Repeat password'
        type='password'
        InputProps={{ endAdornment }}
        {...textFieldProps}
      />}
      {...formFieldProps}
    />
    <Stack direction='row' justifyContent='center'>
      <CircleIcon
        htmlColor={status.colour}
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

export default PasswordFormFields;
