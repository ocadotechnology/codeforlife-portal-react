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
  SelectChangeEvent,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { paths } from 'app/router';
import Password from './Password';

const IndepForm: React.FC<{
  age: number
}> = ({ age }) => {
  const EmailApplicableAge = 13;
  const ReceiveUpdateAge = 18;

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
      navigate(paths.emailVerificationSent, { state: { isTeacher: false } });
    }
  }

  if (age < 0) {
    // Hide the form if age is -1
    return null;
  }
  return (
    <form onSubmit={handleSubmit}>
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
        type='email'
        placeholder={(age >= EmailApplicableAge) ? 'Email address' : 'Parent\'s email address'}
        variant='outlined'
        size='small'
        required
      />

      <Typography paddingTop={1} marginBottom={1} paddingBottom={(age >= EmailApplicableAge) ? 1 : 0}>
        {(age >= EmailApplicableAge) ? 'Enter your email address' : 'Please enter your parent\'s email address'}
      </Typography>

      {(age < EmailApplicableAge) &&
        <Typography fontWeight='bold'>
          We will send your parent/guardian an email to ask them to activate the account for you. Once they&apos;ve done this you&apos;ll be able to log in using your name and password.
        </Typography>
      }

      {(age >= EmailApplicableAge) &&
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

      {(age >= ReceiveUpdateAge) &&
        <>
          <br />
          <FormControlLabel
            control={<Checkbox />}
            label='Sign up to receive updates about Code for Life games and teaching resources.'
          />
          <br />
        </>
      }

      <br />
      <Password
        isTeacher={false}
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
          color='white'
        >
          Register
        </Button>
      </Grid>
    </form>
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

  useEffect(() => {
    // Check if all fields are numbers
    if (!isNaN(+day) && !isNaN(+month) && !isNaN(+year)) {
      const birthday = new Date(+year, +month, +day);
      const today = new Date();

      // Calculate age
      let thisYear = 0;
      if (today.getMonth() < birthday.getMonth()) {
        thisYear = 1;
      } else if ((today.getMonth() === birthday.getMonth()) && today.getDate() < birthday.getDate()) {
        thisYear = 1;
      }
      const age = today.getFullYear() - birthday.getFullYear() - thisYear;
      setAge(age);
    } else {
      // Some fields are not numbers - cannot calculate age
      setAge(-1);
    }
  }, [day, month, year]);


  const dayOptions = Array.from(Array(31).keys()).map(x => x + 1);
  const monthOptions = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(100).keys()).map(x => x + currentYear - 100 + 1).reverse();
  const formMinWidth = 140;

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

        {/* Inputs for day / month / year */}
        <Grid container display='flex' justifyContent='space-between' paddingBottom={3}>
          <Select
            id='select-day'
            value={day}
            onChange={handleChangeDay}
            displayEmpty
            style={{ backgroundColor: 'white', minWidth: formMinWidth }}
            size='small'
          >
            <MenuItem value='dd' dense>Day</MenuItem>
            {dayOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
          </Select>
          <Select
            id='select-month'
            value={month}
            onChange={handleChangeMonth}
            displayEmpty
            style={{ backgroundColor: 'white', minWidth: formMinWidth }}
            size='small'
          >
            <MenuItem value='mm' dense>Month</MenuItem>
            {monthOptions.map(i => <MenuItem key={i} value={monthOptions.indexOf(i)} dense>{i}</MenuItem>)}
          </Select>
          <Select
            id='select-year'
            value={year}
            onChange={handleChangeYear}
            displayEmpty
            style={{ backgroundColor: 'white', minWidth: formMinWidth }}
            size='small'
          >
            <MenuItem value='yy' dense>Year</MenuItem>
            {yearOptions.map(i => <MenuItem key={i} value={i} dense>{i}</MenuItem>)}
          </Select>
        </Grid>

        <IndepForm age={age} />
      </Stack>
    </ThemeProvider >
  );
};

export default IndepRegister;
