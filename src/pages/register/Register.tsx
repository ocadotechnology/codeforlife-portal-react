import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  Unstable_Grid2 as Grid,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
  Link,
  Button,
  InputAdornment
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';

import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';
import { paths } from 'app/router';

const TeacherForm: React.FC = () => {
  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white',
            fontSize: '14px'
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
            the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use </Link>
            and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
          </>}
        />
        <br />

        <FormControlLabel
          control={<Checkbox style={{ color: 'white' }} />}
          label='Sign up to receive updates about Code for Life games and teaching resources.'
        />
        <br />

        <TextField id='password'
          type='password'
          placeholder='Password'
          variant='outlined'
          size='small'
          required
          InputProps={{
            endAdornment: <InputAdornment position="end"><SecurityIcon /></InputAdornment>
          }}
        />
        <Typography paddingY={1}>
          Enter a password
        </Typography>

        <TextField id='password-repeat'
          type='password'
          placeholder='Repeat password'
          variant='outlined'
          size='small'
          required
          InputProps={{
            endAdornment: <InputAdornment position="end"><SecurityIcon /></InputAdornment>
          }}
        />
        <Typography paddingTop={1}>
          Repeat password
        </Typography>
        <Grid xs={12} display='flex' justifyContent='center' alignItems='center'>
          <CircleIcon color='error' stroke="white" strokeWidth={1} />
          &nbsp;&nbsp;<Typography fontSize={18} fontWeight={500} margin={0}>No password!</Typography>
        </Grid>
        <Grid xs={12} display='flex' justifyContent='end' marginY={3}>
          <Button endIcon={<ChevronRightRoundedIcon />}>Register</Button>
        </Grid>
      </Stack>
    </ThemeProvider>
  );
};

const IndepLearnerForm: React.FC = () => {
  return (
    <Grid container xs={12}>
      def
    </Grid>
  );
};

const Register: React.FC = () => {
  return (
    <BasePage>
      <PageSection>
        <Grid container xs={12}>
          <Grid xs={12} md={5.5} margin={{ xs: 1, md: 'auto' }} bgcolor='#ee0857'>
            <TeacherForm />
          </Grid>
          <Grid xs={12} md={5.5} margin={{ xs: 1, md: 'auto' }} bgcolor='#ffc709'>
            <IndepLearnerForm />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default Register;
