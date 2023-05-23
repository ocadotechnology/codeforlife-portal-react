import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';
import { FormikValues } from 'formik';

import ThemedBox, { ThemedBoxProps } from '../../components/ThemedBox';
import { Form, FormProps } from 'codeforlife/lib/esm/components/form';

export interface BaseFormProps<Values> extends FormProps<Values> {
  themedBoxProps: Omit<ThemedBoxProps, 'withIcons'>;
  header: string;
  subheader: string;
}

const BaseForm = <Values extends FormikValues = FormikValues>({
  themedBoxProps,
  header,
  subheader,
  ...formProps
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
        <Form {...formProps} />
      </Stack>
    </ThemedBox>
  );
};

export default BaseForm;
