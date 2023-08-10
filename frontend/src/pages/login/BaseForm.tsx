import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FormikValues } from 'formik';

import theme, { ThemedBox, ThemedBoxProps } from 'codeforlife/lib/esm/theme';
import { Form, FormProps } from 'codeforlife/lib/esm/components/form';

import { themeOptions } from '../../app/theme';
import { useTheme } from '@mui/material';

export interface BaseFormProps<Values> extends FormProps<Values> {
  themedBoxProps: Omit<ThemedBoxProps, 'withShapes'>;
  header: string;
  subheader: string;
}
const BaseForm = <Values extends FormikValues = FormikValues>({
  themedBoxProps,
  header,
  subheader,
  ...formProps
}: BaseFormProps<Values>): JSX.Element => {
  const theme = useTheme();
  return (
    <ThemedBox withShapes options={themeOptions} {...themedBoxProps}>
      <Stack
        sx={{
          paddingY: theme.spacing(1.5),
          paddingX: theme.spacing(3)
        }}
      >
        <Typography align="center" variant="h4">
          {header}
        </Typography>
        <Typography align="center" variant="h6">
          {subheader}
        </Typography>
        <Form {...formProps} />
      </Stack>
    </ThemedBox>
  );
};
export default BaseForm;
