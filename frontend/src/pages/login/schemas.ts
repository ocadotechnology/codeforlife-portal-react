import { object, string } from 'yup';

export const LoginSchema = object({
  username: string().required('The email address is required')
    .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid Email'), // their email check was weak
  password: string()
    .required('Password is required')
});

export const AccessCodeLoginSchema = object({
  accessCode: string().required('The access code is required').matches(/^[A-Z]{2}[0-9]{3}$/, 'Invalid access code')
});

export const StudentLoginSchema = object({
  firstname: string().required('This field is required'),
  password: string().required('Password is required'),
  accessCode: string().required('The access code is required').matches(/^[A-Z]{2}[0-9]{3}$/, 'Invalid access code')
});
