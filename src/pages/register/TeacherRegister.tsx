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
  FormControl,
  InputAdornment
} from '@mui/material';
import { ChevronRightRounded as ChevronRightRoundedIcon } from '@mui/icons-material';
import SecurityIcon from '@mui/icons-material/Security';
import { paths } from 'app/router';
import Password from './Password';
import { useNavigate } from 'react-router-dom';

import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PasswordStatus from './PasswordStatus';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  termsOfUse: boolean;
  receiveUpdates: boolean;
  password: string;
  repeatPassword: string;
}

const TeacherFormSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  termsOfUse: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
  // TODO: strong password test
  password: Yup.string().required('Field is required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), undefined], "Passwords don't match").required('Confirm Password is required'),
})

const TeacherForm: React.FC = () => {
  const [pwd, setPwd] = useState('');
  const [isStrongPwd, setIsStrongPwd] = useState(false);

  const onChangePassword = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    setPwd(ev.target.value);
  };

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
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
      ) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      <Form>
        <Field
          id='firstName'
          name='firstName'
          placeholder='First name'
          as={TextField}
          size='small'
        />
        <Typography paddingY={1}>
          Enter your first name
        </Typography>
        <ErrorMessage name="firstName">{msg => <Typography>{msg}</Typography>}</ErrorMessage>

        <Field
          id='lastName'
          name='lastName'
          placeholder='Last name'
          as={TextField}
          size='small'
        />
        <Typography paddingY={1}>
          Enter your last name
        </Typography>
        <ErrorMessage name="lastName">{msg => <Typography>{msg}</Typography>}</ErrorMessage>

        <Field
          id='email'
          name='email'
          placeholder='Email address'
          as={TextField}
          size='small'
        />
        <Typography paddingY={1}>
          Enter your email address
        </Typography>
        <ErrorMessage name="email">{msg => <Typography>{msg}</Typography>}</ErrorMessage>

        <Typography>
          <Field type='checkbox' name='termsOfUse' />
          &nbsp;I am over 18 years old have read and understood
          the <Link href={paths.termsOfUse} color='inherit' underline='always' target='_blank'>Terms of use</Link>
          &nbsp;and the <Link href={paths.privacyNotice} color='inherit' underline='always' target='_blank'>Privacy notice</Link>.
        </Typography>
        <ErrorMessage name="termsOfUse">{msg => <Typography>{msg}</Typography>}</ErrorMessage>

        <Typography paddingY={1}>
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
        <Typography paddingY={1}>
          Enter a password
        </Typography>
        <ErrorMessage name="password">{msg => <Typography>{msg}</Typography>}</ErrorMessage>


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
        <ErrorMessage name="repeatPassword">{msg => <Typography>{msg}</Typography>}</ErrorMessage>

        <PasswordStatus
          isTeacher={true}
          pwd={pwd}
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
      </Form>
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
