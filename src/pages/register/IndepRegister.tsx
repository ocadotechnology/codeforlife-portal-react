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
  InputAdornment
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';
import SecurityIcon from '@mui/icons-material/Security';
import CircleIcon from '@mui/icons-material/Circle';

import { useNavigate } from 'react-router-dom';
import { paths } from 'app/router';

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { isPasswordStrong, PASSWORD_STATUS, MOST_USED_PASSWORDS } from './constants';
import MyErrorMessage from './MyErrorMessage';

interface IndepFormValues {
  fullName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const indepPasswordStrengthCheck = (password: string) => (password.length >= 8 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1));

const IndepFormSchema = Yup.object({
  fullName: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email address').required('This field is required'),
  // termsOfUse: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
  password: Yup.string().required('This field is required')
    .test(
      'indep-password-strength-check',
      indepPasswordStrengthCheck
    ),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), undefined], "Passwords don't match").required('Confirm Password is required'),
});


const IndepForm: React.FC<{
  age: number
}> = ({ age }) => {
  const EmailApplicableAge = 13;
  const ReceiveUpdateAge = 18;

  const [pwd, setPwd] = useState('');
  const [pwdStatus, setPwdStatus] = useState(PASSWORD_STATUS.NO_PWD);

  const theme = useTheme();
  const errMsgColor = theme.palette.error.light;

  const navigate = useNavigate();

  const onChangePassword = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setPwd(ev.target.value);
  };

  useEffect(() => {
    if (pwd === '') {
      setPwdStatus(PASSWORD_STATUS.NO_PWD);
    } else if (MOST_USED_PASSWORDS.includes(pwd)) {
      setPwdStatus(PASSWORD_STATUS.TOO_COMMON);
    } else if (isPasswordStrong(pwd, false)) {
      setPwdStatus(PASSWORD_STATUS.STRONG);
    } else {
      setPwdStatus(PASSWORD_STATUS.TOO_WEAK);
    }
  }, [pwd]);

  if (age < 0) {
    // Hide the form if age is -1
    return null;
  }
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        termsOfUse: false,
        receiveUpdates: false,
        password: '',
        repeatPassword: '',
      }}
      validationSchema={IndepFormSchema}
      onSubmit={(
        values: IndepFormValues,
        { setSubmitting }: FormikHelpers<IndepFormValues>
      ) => {
        // TODO: to call backend
        setSubmitting(false);
        navigate(paths.emailVerificationSent, { state: { isTeacher: false } });
      }}
    >
      {(formik) => (
        <Form>
          <Field
            id='fullName'
            name='fullName'
            placeholder='Full name'
            as={TextField}
            size='small'
          />
          <Typography paddingTop={1}>
            Enter your full name
          </Typography>
          <MyErrorMessage fieldName='fullName' color={errMsgColor} />

          <Field
            id='email'
            name='email'
            placeholder='Email address'
            as={TextField}
            size='small'
          />
          <Typography paddingTop={1} marginBottom={1} paddingBottom={(age >= EmailApplicableAge) ? 1 : 0}>
            {(age >= EmailApplicableAge) ? 'Enter your email address' : 'Please enter your parent\'s email address'}
          </Typography>
          <MyErrorMessage fieldName='email' color={errMsgColor} />

          {(age < EmailApplicableAge) &&
            <Typography fontWeight='bold'>
              We will send your parent/guardian an email to ask them to activate the account for you. Once they&apos;ve done this you&apos;ll be able to log in using your name and password.
            </Typography>
          }

          {(age >= EmailApplicableAge) &&
            <>
              <Typography>
                <Field type='checkbox' name='termsOfUse' required />
                &nbsp;I have read and understood
                the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use</Link>
                &nbsp;and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
              </Typography>
              <MyErrorMessage fieldName='termsOfUse' color={errMsgColor} />
            </>
          }

          {(age >= ReceiveUpdateAge) &&
            <>
              <Typography paddingTop={1}>
                <Field type='checkbox' name='receiveUpdates' />
                &nbsp;Sign up to receive updates about Code for Life games and teaching resources.
              </Typography>
            </>
          }

          <Field
            id='password'
            name='password'
            placeholder='Password'
            as={TextField}
            size='small'
            type='password'
            onKeyUp={onChangePassword}
            InputProps={{
              endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
            }}
          />
          <Typography paddingTop={1}>
            Enter a password
          </Typography>

          <Field
            id='repeatPassword'
            name='repeatPassword'
            placeholder='Repeat password'
            as={TextField}
            size='small'
            type='password'
            InputProps={{
              endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
            }}
          />
          <Typography paddingTop={1}>
            Repeat password
          </Typography>
          <MyErrorMessage fieldName='repeatPassword' color={errMsgColor} />

          <Grid xs={12} className='flex-center'>
            <CircleIcon htmlColor={pwdStatus.colour} stroke='white' strokeWidth={1} />&nbsp;&nbsp;
            <Typography fontSize={18} fontWeight={500} margin={0}>{pwdStatus.name}</Typography>
          </Grid>

          <Grid xs={12} className='flex-end-x' marginY={3}>
            <Button
              type='submit'
              endIcon={<ChevronRightRoundedIcon />}
              disabled={!(formik.dirty)}
            >
              Register
            </Button>
          </Grid>

        </Form>
      )}
    </Formik>
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
