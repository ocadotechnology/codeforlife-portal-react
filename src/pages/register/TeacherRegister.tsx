import React, { useEffect, useState } from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Stack,
  ThemeProvider,
  createTheme,
  useTheme,
  Link,
  Button,
  FormControlLabel,
  Checkbox,
  FormControl
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import { paths } from 'app/router';
import Password from './Password';
import { useNavigate } from 'react-router-dom';

const TeacherForm: React.FC = () => {
  const [pwd, setPwd] = useState('');
  const [pwdMatch, setPwdMatch] = useState(true);
  const [isStrongPwd, setIsStrongPwd] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!pwdMatch) {
      alert('Passwords do not match!');
    }
    if (pwdMatch && isStrongPwd) {
      navigate(paths.emailVerificationSent, { state: { isTeacher: true } })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <TextField id='first-name'
          placeholder='First name'
          variant='outlined'
          size='small'
          required
        />
        <Typography paddingY={1}>
          Enter your first name
        </Typography>

        <TextField id='last-name'
          placeholder='Last name'
          variant='outlined'
          size='small'
          required
        />
        <Typography paddingY={1}>
          Enter your last name
        </Typography>

        <TextField id='email-address'
          type='email'
          placeholder='Email address'
          variant='outlined'
          size='small'
          required
        />
        <Typography paddingY={1}>
          Enter your email address
        </Typography>

        <FormControlLabel
          control={<Checkbox required style={{ color: 'white' }} />}
          label={<>I am over 18 years old have read and understood
            the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use</Link>
            &nbsp;and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
          </>}
        />
        <br />

        <FormControlLabel
          control={<Checkbox style={{ color: 'white' }} />}
          label='Sign up to receive updates about Code for Life games and teaching resources.'
        />

        <br />
        <Password
          isTeacher={true}
          pwd={pwd}
          setPwd={setPwd}
          pwdMatch={pwdMatch}
          setPwdMatch={setPwdMatch}
          setIsStrongPwd={setIsStrongPwd}
        />

        <Grid xs={12} className='flex-end-x' marginY={3}>
          <Button
            type='submit'
            endIcon={<ChevronRightRoundedIcon />}
          >
            Register
          </Button>
        </Grid>
      </FormControl>
    </form>
  );
};

const TeacherRegister: React.FC = () => {
  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
            fontSize: '14px',
            fontWeight: 500
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack p={3}>
        <Typography variant='h4' textAlign='center' paddingY={1}>
          Teacher/Tutor
        </Typography>
        <Typography variant='h6'>
          Register below to create your school or club.
        </Typography>
        <Typography paddingBottom={2}>
          You will have access to teaching resources, progress tracking and lesson plans for both Rapid Router and Kurono.
        </Typography>

        <TeacherForm />
      </Stack>
    </ThemeProvider>
  );
};

export default TeacherRegister;
