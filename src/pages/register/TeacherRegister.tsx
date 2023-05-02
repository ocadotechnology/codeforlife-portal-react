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

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const teacherPasswordStrengthCheck = (password: string) => (password.length >= 10 && !(password.search(/[A-Z]/) === -1 || password.search(/[a-z]/) === -1 || password.search(/[0-9]/) === -1 || password.search(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) === -1));

const TeacherFormSchema = Yup.object({
  firstName: Yup.string().required('This field is required'),
  lastName: Yup.string().required('This field is required'),
  email: Yup.string().email('Invalid email address').required('This field is required'),
  termsOfUse: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
  password: Yup.string().required('This field is required')
    .test(
      'teacher-password-strength-check',
      teacherPasswordStrengthCheck
    ),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), undefined], "Passwords don't match").required('Confirm Password is required'),
})

const TeacherForm: React.FC = () => {
  const [pwd, setPwd] = useState('');
  const [pwdStatus, setPwdStatus] = useState(PASSWORD_STATUS.NO_PWD);

  const theme = useTheme();
  const errMsgColor = theme.palette.error.dark;

  const navigate = useNavigate();

  const onChangePassword = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setPwd(ev.target.value);
  };

  useEffect(() => {
    if (pwd === '') {
      setPwdStatus(PASSWORD_STATUS.NO_PWD);
    } else if (MOST_USED_PASSWORDS.includes(pwd)) {
      setPwdStatus(PASSWORD_STATUS.TOO_COMMON);
    } else if (isPasswordStrong(pwd, true)) {
      setPwdStatus(PASSWORD_STATUS.STRONG);
    } else {
      setPwdStatus(PASSWORD_STATUS.TOO_WEAK);
    }
  }, [pwd]);

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        termsOfUse: false,
        receiveUpdates: false,
        password: '',
        repeatPassword: '',
      }}
      validationSchema={TeacherFormSchema}
      onSubmit={(
        values: TeacherFormValues,
        { setSubmitting }: FormikHelpers<TeacherFormValues>
      ) => {
        // TODO: to call backend
        setSubmitting(false);
        navigate(paths.emailVerificationSent, { state: { isTeacher: true } });
      }}
    >
      {(formik) => (
        <Form>
          <Field
            id='firstName'
            name='firstName'
            placeholder='First name'
            as={TextField}
            size='small'
          />
          <Typography paddingTop={1}>
            Enter your first name
          </Typography>
          <MyErrorMessage fieldName='firstName' color={errMsgColor} />

          <Field
            id='lastName'
            name='lastName'
            placeholder='Last name'
            as={TextField}
            size='small'
          />
          <Typography paddingTop={1}>
            Enter your last name
          </Typography>
          <MyErrorMessage fieldName='lastName' color={errMsgColor} />

          <Field
            id='email'
            name='email'
            placeholder='Email address'
            as={TextField}
            size='small'
          />
          <Typography paddingTop={1}>
            Enter your email address
          </Typography>
          <MyErrorMessage fieldName='email' color={errMsgColor} />

          <Typography>
            <Field type='checkbox' name='termsOfUse' />
            &nbsp;I am over 18 years old have read and understood
            the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use</Link>
            &nbsp;and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
          </Typography>
          <MyErrorMessage fieldName='termsOfUse' color={errMsgColor} />

          <Typography paddingTop={1}>
            <Field type='checkbox' name='receiveUpdates' />
            &nbsp;Sign up to receive updates about Code for Life games and teaching resources.
          </Typography>

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
