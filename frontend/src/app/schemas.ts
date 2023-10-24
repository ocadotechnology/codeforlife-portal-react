import * as yup from 'yup';

export const accessCodeSchema = yup
  .string()
  .matches(/^[A-Z0-9]{5}$/, 'Invalid access code');
