import React from 'react';
import {
  Stack,
  StackProps
} from '@mui/material';
import {
  Formik,
  FormikValues,
  FormikConfig,
  FormikProps,
  Form
} from 'formik';

export interface CflFormProps<Values>
  extends FormikConfig<Values> {
  children: (formik: FormikProps<Values>) => React.ReactNode,
  stackProps?: StackProps
}

const CflForm = <Values extends FormikValues = FormikValues>({
  children,
  stackProps = { gap: 1 },
  ...formikProps
}: CflFormProps<Values>): JSX.Element => {
  return (
    <Formik {...formikProps}>
      {(formik) => (
        <Form>
          <Stack {...stackProps}>
            {children(formik)}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CflForm;
