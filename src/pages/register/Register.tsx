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
  InputAdornment,
  Select,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';

import SecurityIcon from '@mui/icons-material/Security';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';

import BasePage from 'pages/BasePage';
import PageSection from 'components/PageSection';
import { paths } from 'app/router';

const Password: React.FC = () => {
  return (
    <>
      <TextField id='password'
        type='password'
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
      <Grid xs={12} display='flex' justifyContent='center' alignItems='center'>
        <CircleIcon color='error' stroke='white' strokeWidth={1} />
        &nbsp;&nbsp;<Typography fontSize={18} fontWeight={500} margin={0}>No password!</Typography>
      </Grid>
    </>
  );
};

const TeacherInfo: React.FC = () => {
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
    </>
  );
};

const TeacherForm: React.FC = () => {
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

        <TeacherInfo />

        <Password />

        <Grid xs={12} display='flex' justifyContent='end' marginY={3}>
          <Button endIcon={<ChevronRightRoundedIcon />}>Register</Button>
        </Grid>
      </Stack>
    </ThemeProvider>
  );
};

const IndepLearnerForm: React.FC = () => {
  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: '14px',
            fontWeight: 500
          }
        }
      }
    }
  });

  const dateOptions = Array.from(Array(31).keys()).map(x => x + 1);
  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(100).keys()).map(x => (+x) + currentYear - 100 + 1).reverse();
  const formMinWidth = 140;

  return (
    <ThemeProvider theme={theme}>
      <Stack p={3}>
        <Typography variant='h4' textAlign='center' paddingY={1}>
          Independent learner
        </Typography>
        <Typography variant='h6'>
          Register below if you are not part of a school or club and wish to set up a home learning account.
        </Typography>
        <Typography paddingBottom={2}>
          You will have access to learning resources for Rapid Router.
        </Typography>

        <Typography paddingY={1}>
          Please enter your date of birth (we do not store this information).
        </Typography>

        <Grid container display='flex' justifyContent='space-evenly'>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              id='select-dd'
              label='dd'
            >
              {dateOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              id='select-mm'
              label='mm'
            >
              {monthOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              id='select-yy'
              label='yy'
            >
              {yearOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Stack>
    </ThemeProvider >
  );
};

const Register: React.FC = () => {
  return (
    <BasePage>
      <PageSection>
        <Grid container xs={12}>
          <Grid xs={12} md={5.5} marginX={{ xs: 1, md: 'auto' }} marginBottom={{ xs: 2, md: 'auto' }} bgcolor='#ee0857'>
            <TeacherForm />
          </Grid>
          <Grid xs={12} md={5.5} marginX={{ xs: 1, md: 'auto' }} marginBottom='auto' bgcolor='#ffc709'>
            <IndepLearnerForm />
          </Grid>
        </Grid>
      </PageSection>
    </BasePage>
  );
};

export default Register;
