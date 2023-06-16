import React from 'react';
import {
  Grid,
  Stack,
  StackProps,
  Typography,
  GridProps,
  ButtonProps
} from '@mui/material';
import { Formik, FormikValues, FormikConfig, FormikProps, Form } from 'formik';

export interface CflHorizontalFormProps<Values> extends FormikConfig<Values> {
  header?: string;
  subheader?: string;
  subheaderBold?: string;
  children?: JSX.Element[] | JSX.Element;
  gridProps?: GridProps;
  submitButton: React.ReactElement<ButtonProps>;
  cancelButton?: React.ReactElement<ButtonProps>;
}

export const CflHorizontalForm = <Values extends FormikValues = FormikValues>({
  children,
  gridProps = { container: true, columnSpacing: 3 },
  header,
  subheader,
  subheaderBold,
  submitButton,
  cancelButton,
  ...formikProps
}: CflHorizontalFormProps<Values>): JSX.Element => {
  return (
    <Formik {...formikProps} validateOnMount={true}>
      {(formik) => (
        <React.Fragment>
          {header && (
            <Typography variant="h5" sx={{ mb: 2 }}>
              {header}
            </Typography>
          )}
          {subheader && <Typography>{subheader}</Typography>}
          {subheaderBold && (
            <Typography fontWeight="bold">{subheaderBold}</Typography>
          )}
          <Form>
            <Grid {...gridProps}>
              {React.Children.map(children, (child, index) => {
                if (Array.isArray(children)) {
                  // Allow last child components such as checkboxes to take up the full width
                  const isLastChild = children && index === children?.length - 1;
                  return (
                    <Grid xs={12} sm={isLastChild ? true : 4} item>
                      {child}
                    </Grid>
                  );
                } else {
                  return (
                    <React.Fragment>
                      <Grid xs={12} sm={6} item>
                        {child}
                      </Grid>
                      <Grid item xs={0} sm={6}></Grid>
                    </React.Fragment>
                  );
                }
              })}
              {cancelButton
                ? <Grid xs={12} sm={4} item>
                  <Stack direction="row" spacing={2}>
                    {React.cloneElement(cancelButton)}
                    {React.cloneElement(submitButton, {
                      disabled: !formik.isValid
                    })}
                  </Stack>
                </Grid>
                : <Grid item xs={12}>
                {submitButton}
              </Grid>
              }
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
