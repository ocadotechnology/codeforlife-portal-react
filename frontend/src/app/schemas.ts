import * as yup from 'yup';

export const accessCodeSchema = yup.string()
  .matches(/^[A-Z]{2}[0-9]{3}$/, 'Invalid access code');
