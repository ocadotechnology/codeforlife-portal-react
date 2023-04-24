import React, { useEffect, useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';

import SecurityIcon from '@mui/icons-material/Security';
import CircleIcon from '@mui/icons-material/Circle';

function isPasswordStrong(password: string, isTeacher: boolean): boolean {
  if (isTeacher) {
    return password.length >= 10 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1 || password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1);
  } else {
    return password.length >= 8 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1);
  }
}

const Password: React.FC<{
  isTeacher: boolean
}> = ({ isTeacher }) => {
  const pwdStrengths = {
    NoPwd: { name: 'No password!', colour: '#FF0000' },
    TooWeak: { name: 'Password too weak!', colour: '#DBA901' },
    Strong: { name: 'Strong password!', colour: '#088A08' },
    TooCommon: { name: 'Password too common!', colour: '#DBA901' }
  };
  const mostUsedPasswords = ['Abcd1234', 'Password1', 'Qwerty123'];

  const [pwd, setPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [pwdStatus, setPwdStatus] = useState(pwdStrengths.NoPwd);
  const [pwdMatch, setPwdMatch] = useState(true);

  useEffect(() => {
    if (pwd === '') {
      setPwdStatus(pwdStrengths.NoPwd);
    } else if (mostUsedPasswords.includes(pwd)) {
      setPwdStatus(pwdStrengths.TooCommon);
    } else if (isPasswordStrong(pwd, isTeacher)) {
      setPwdStatus(pwdStrengths.Strong);
    } else {
      setPwdStatus(pwdStrengths.TooWeak);
    }
  }, [pwd]);

  useEffect(() => {
    setPwdMatch((pwd === repeatPwd));
  }, [pwd, repeatPwd]);

  return (
    <>
      <TextField id='password'
        type='password'
        value={pwd}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPwd(event.target.value);
        }}
        placeholder='Password'
        variant='outlined'
        size='small'
        required
        InputProps={{
          endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
        }}
      />
      <Typography paddingY={1}>
        Enter a password
      </Typography>

      <TextField id='password-repeat'
        type='password'
        value={repeatPwd}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setRepeatPwd(event.target.value);
        }}
        placeholder='Repeat password'
        variant='outlined'
        size='small'
        required
        InputProps={{
          endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
        }}
      />
      <Typography paddingTop={1}>
        Repeat password
      </Typography>
      {!pwdMatch && <Typography fontSize={12}> Passwords do not match!</Typography>}

      <Grid xs={12} className='flex-center'>
        <CircleIcon htmlColor={pwdStatus.colour} stroke='white' strokeWidth={1} />&nbsp;&nbsp;
        <Typography fontSize={18} fontWeight={500} margin={0}>{pwdStatus.name}</Typography>
      </Grid>
    </>
  );
};

export default Password;
