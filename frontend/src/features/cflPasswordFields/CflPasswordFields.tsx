import React from 'react';
import {
  Typography,
  Stack,
  Dialog,
  Button
} from '@mui/material';
import {
  Circle as CircleIcon
} from '@mui/icons-material';
import * as yup from 'yup';
import CryptoJS from 'crypto-js';

import {
  PasswordField
} from 'codeforlife/lib/esm/components/form';

export interface CflPasswordFieldsProps {
  userType: 'teacher' | 'independent' | 'student';
  passwordName?: string;
  repeatPasswordName?: string;
}

const CflPasswordFields: React.FC<CflPasswordFieldsProps> = ({
  userType,
  passwordName = 'password',
  repeatPasswordName = 'repeatPassword'
}) => {
  type ErrorType = 'tooWeak' | 'tooCommon' | 'required';
  type ErrorColor = '#FF0000' | '#DBA901';
  const errors: Record<ErrorType, {
    message: string;
    color: ErrorColor;
  }> = {
    tooWeak: { message: 'Password too weak!', color: '#DBA901' },
    tooCommon: { message: 'Password too common!', color: '#DBA901' },
    required: { message: 'No password!', color: '#FF0000' }
  };

  const [errorType, setErrorType] = React.useState<
    undefined | ErrorType
  >('required');
  const [pwnedPasswords, setPwnedPasswords] = React.useState<{
    online: boolean;
    dialog: { open: boolean; };
  }>({
    online: true,
    dialog: { open: false }
  });

  let schema = yup.string().required('required');

  switch (userType) {
    case 'teacher':
      schema = schema.test({
        message: 'tooWeak',
        test: (password) => password.length >= 10 && !(
          password.search(/[A-Z]/) === -1 ||
          password.search(/[a-z]/) === -1 ||
          password.search(/[0-9]/) === -1 ||
          password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1
        )
      });
      break;
    case 'student':
      schema = schema.test({
        message: 'tooWeak',
        test: (password) => password.length >= 6
      });
      break;
    case 'independent':
      schema = schema.test({
        message: 'tooWeak',
        test: (password) => password.length >= 8 && !(
          password.search(/[A-Z]/) === -1 ||
          password.search(/[a-z]/) === -1 ||
          password.search(/[0-9]/) === -1
        )
      });
      break;
  }

  const pwnedPasswordSchema = yup.string().test({
    message: 'tooCommon',
    test: async (password) => {
      try {
        // Hash the password.
        const hashedPassword = CryptoJS.SHA1(password as string)
          .toString()
          .toUpperCase();
        const hashPrefix = hashedPassword.substring(0, 5);
        const hashSuffix = hashedPassword.substring(5);

        // Call Pwned Passwords API.
        const response = await fetch(
          `https://api.pwnedpasswords.com/range/${hashPrefix}`
        );
        // TODO: Standardize how to log non-okay responses.
        if (!response.ok) throw Error();

        // Parse response.
        const data = await response.text();
        return !data.includes(hashSuffix);
      } catch (error) {
        // TODO: log error on our servers.

        // Alert user test couldn't be carried out.
        setPwnedPasswords({
          online: false,
          dialog: { open: true }
        });

        return true;
      }
    }
  });

  return <>
    <PasswordField
      required
      name={passwordName}
      placeholder='Password'
      helperText='Enter a password'
      validate={async (password) => {
        try {
          await schema.validate(password);
          if (pwnedPasswords.online) {
            await pwnedPasswordSchema.validate(password);
          }
          setErrorType(undefined);
        } catch (error) {
          if (!(error instanceof yup.ValidationError)) throw error;
          const errorType = error.errors[0] as ErrorType;
          setErrorType(errorType);
          return errors[errorType].message;
        }
      }}
      repeat={[
        {
          name: repeatPasswordName,
          placeholder: 'Repeat password',
          helperText: 'Repeat password'
        }
      ]}
    />
    <Stack
      direction='row'
      justifyContent='center'
      mb={2}
    >
      <CircleIcon
        htmlColor={errorType === undefined
          ? '#088A08'
          : errors[errorType].color
        }
        stroke='white'
        strokeWidth={1}
      />
      <Typography
        fontSize={18}
        fontWeight={500}
        margin={0}
      >
        &nbsp;&nbsp;{errorType === undefined
          ? 'Strong password!'
          : errors[errorType].message
        }
      </Typography>
    </Stack>
    <Dialog open={!pwnedPasswords.online && pwnedPasswords.dialog.open}>
      <Typography variant='h5' className='no-override'>
        Password Vulnerability Check Unavailable
      </Typography>
      <Typography className='no-override'>
        We are currently unable to check your password vulnerability. Please ensure that you are using a strong password. If you are happy to continue, please confirm.
      </Typography>
      <Button
        className='no-override'
        onClick={() => {
          setPwnedPasswords({
            online: false,
            dialog: { open: false }
          });
        }}
      >
        I understand
      </Button>
    </Dialog>
  </>;
};

export default CflPasswordFields;
