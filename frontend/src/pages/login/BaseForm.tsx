import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';
import { FormikValues } from 'formik';

import ThemedBox, { ThemedBoxProps } from '../../components/ThemedBox';
import CflForm, { CflFormProps } from '../../components/formik/CflForm';

export interface BaseFormProps<Values> extends CflFormProps<Values> {
  themedBoxProps: Omit<ThemedBoxProps, 'withIcons'>;
  header: string;
  subheader: string;
}

const BaseForm = <Values extends FormikValues = FormikValues>({
  themedBoxProps,
  header,
  subheader,
  ...cflFormProps
}: BaseFormProps<Values>): JSX.Element => {
  return (
    <ThemedBox withIcons {...themedBoxProps}>
      <Stack>
        <Typography align='center' variant='h4'>
          {header}
        </Typography>
        <Typography align='center' variant='h5'>
          {subheader}
        </Typography>
        <CflForm {...cflFormProps} />
      </Stack>
    </ThemedBox>
  );
};

export default BaseForm;
