import React from 'react';
import {
  Grid,
  Stack,
  StackProps,
  Typography,
  GridProps,
  ButtonProps,
  TypographyProps
} from '@mui/material';
import { Formik, FormikValues, FormikConfig, FormikProps, Form } from 'formik';

export interface CflHorizontalFormProps<Values> extends FormikConfig<Values> {
  header: string;
  subheader?: string;
  subheaderBold?: string;
  children?: JSX.Element[];
  gridProps?: GridProps;
  submitButton: React.ReactElement<ButtonProps>;
  headerAlignment?: TypographyProps['align'];
}

export const CflHorizontalForm = <Values extends FormikValues = FormikValues>({
  children,
  gridProps = { container: true, columnSpacing: 3 },
  header,
  headerAlignment = 'left',
  subheader,
  subheaderBold,
  submitButton,
  ...formikProps
}: CflHorizontalFormProps<Values>): JSX.Element => {
  return (
    <Formik {...formikProps}>
      {(formik) => (
        <React.Fragment>
          <Typography align={headerAlignment} variant="h4" sx={{ mb: 2 }}>
            {header}
          </Typography>
          <Typography>{subheader}</Typography>
          <Typography fontWeight="bold">{subheaderBold}</Typography>
          <Form>
            <Grid {...gridProps}>
              {React.Children.map(children, (child, index) => {
                // Allow last child components such as checkboxes to take up the full width
                const isLastChild = children && index === children?.length - 1;
                return (
                  <Grid xs={12} sm={isLastChild ? true : 4} item>
                    {child}
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                {React.cloneElement(submitButton, {
                  disabled: !(formik.isValid && formik.dirty)
                })}
              </Grid>
            </Grid>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export interface CflFormProps<Values> extends FormikConfig<Values> {
  children: (formik: FormikProps<Values>) => React.ReactNode;
  stackProps?: StackProps;
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
          <Stack {...stackProps}>{children(formik)}</Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CflForm;
