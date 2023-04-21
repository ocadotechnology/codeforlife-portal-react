import React from 'react';
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
  Checkbox
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import { paths } from 'app/router';
import Password from './Password';

const TeacherForm: React.FC = () => {
  return (
    <>
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

      <Password isTeacher={true} />

      <Grid xs={12} display='flex' justifyContent='end' marginY={3}>
        <Button endIcon={<ChevronRightRoundedIcon />}>Register</Button>
      </Grid>
    </>
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
