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
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';

import { paths } from 'app/router';
import Password from './Password';
import { useNavigate } from 'react-router-dom';

const IndepForm: React.FC<{
  age: number
}> = ({ age }) => {
  const navigate = useNavigate();
  const onRegisterClick = (): void => {
    navigate(paths.emailVerificationSent, { state: { isTeacher: false } });
  };

  if (age < 0) {
    return null;
  }
  return (
    <>
      <TextField id='full-name'
        placeholder='Full name'
        variant='outlined'
        size='small'
        required
      />
      <Typography paddingY={1}>
        Enter your full name
      </Typography>
      <TextField id='email'
        placeholder={(age >= 13) ? 'Email address' : 'Parent\'s email address'}
        variant='outlined'
        size='small'
        required
      />

      <Typography paddingTop={1} marginBottom={1} paddingBottom={(age >= 13) ? 1 : 0}>
        {(age >= 13) ? 'Enter your email address' : 'Please enter your parent\'s email address'}
      </Typography>

      {(age < 13) &&
        <Typography fontWeight='bold'>
          We will send your parent/guardian an email to ask them to activate the account for you. Once they&apos;ve done this you&apos;ll be able to log in using your name and password.
        </Typography>
      }

      {(age >= 13) &&
        <>
          <FormControlLabel
            control={<Checkbox required />}
            label={<>I have read and understood
              the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use</Link>
              &nbsp;and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
            </>}
          />
          <br />
        </>
      }

      {(age >= 18) &&
        <>
          <FormControlLabel
            control={<Checkbox />}
            label='Sign up to receive updates about Code for Life games and teaching resources.'
          />
          <br />
        </>
      }

      <Password isTeacher={false} />

      <Grid xs={12} display='flex' justifyContent='end' marginY={3}>
        <Button endIcon={<ChevronRightRoundedIcon />} color='white' onClick={onRegisterClick}>Register</Button>
      </Grid >
    </>
  );
};

const IndepRegister: React.FC = () => {
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

  const [day, setDay] = useState('dd');
  const [month, setMonth] = useState('mm');
  const [year, setYear] = useState('yy');
  const [age, setAge] = useState(-1);

  const dayOptions = Array.from(Array(31).keys()).map(x => x + 1);
  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(100).keys()).map(x => (+x) + currentYear - 100 + 1).reverse();
  const formMinWidth = 140;

  useEffect(() => {
    if (!isNaN(+day) && !isNaN(+month) && !isNaN(+year)) {
      const birthday = new Date(+year, +month, +day);
      const today = new Date();

      // calculate age
      let thisYear = 0;
      if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
      } else if ((today.getMonth() === birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
      }
      const age = today.getFullYear() - birthday.getFullYear() - thisYear;

      setAge(age);
    } else {
      setAge(-1);
    }
  }, [day, month, year]);

  const handleChangeDay = (e: SelectChangeEvent): void => {
    setDay(e.target.value);
  };
  const handleChangeMonth = (e: SelectChangeEvent): void => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e: SelectChangeEvent): void => {
    setYear(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack p={3}>
        <Typography variant='h4' textAlign='center' paddingY={1}>
          Independent learner
        </Typography>
        <Typography variant='h6'>
          Register below if you are not part of a school or club and wish to set up a home learning account.
        </Typography>
        <Typography>
          You will have access to learning resources for Rapid Router.
        </Typography>

        <Typography paddingTop={2}>
          Please enter your date of birth (we do not store this information).
        </Typography>

        <Grid container display='flex' justifyContent='space-between' paddingBottom={3}>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <Select
              id='select-day'
              value={day}
              onChange={handleChangeDay}
              displayEmpty
              style={{ backgroundColor: 'white' }}
            >
              <MenuItem value='dd' dense>Day</MenuItem>
              {dayOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <Select
              id='select-month'
              value={month}
              onChange={handleChangeMonth}
              displayEmpty
              style={{ backgroundColor: 'white' }}
            >
              <MenuItem value='mm' dense>Month</MenuItem>
              {monthOptions.map(i => <MenuItem key={i} value={monthOptions.indexOf(i)} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: formMinWidth }} size='small'>
            <Select
              id='select-year'
              value={year}
              onChange={handleChangeYear}
              displayEmpty
              style={{ backgroundColor: 'white' }}
            >
              <MenuItem value='yy' dense>Year</MenuItem>
              {yearOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        <IndepForm age={age} />
      </Stack>
    </ThemeProvider >
  );
};

export default IndepRegister;
