import React from 'react';
import {
  useTheme,
  Typography,
  TypographyProps
} from '@mui/material';
import {
  Field,
  FieldAttributes,
  ErrorMessage
} from 'formik';

export interface FormFieldProps extends FieldAttributes<any> {
  name: string,
  typographyProps?: TypographyProps
}

const FormField: React.FC<FormFieldProps> = ({
  name, typographyProps = {}, ...otherProps
}) => {
  // const theme = useTheme();

  // let {
  //   color,
  //   ...otherTypographyProps
  // } = typographyProps;

  // color = (color === undefined) ? theme.palette.error.main : color;

  return <>
    <Field name={name} {...otherProps} />
    <ErrorMessage
      name={name}
      render={(errorMessage) =>
        <Typography
          {...typographyProps}
        // color={color}
        // {...otherTypographyProps}
        >
          {errorMessage}
        </Typography>
      }
    />
  </>;
};

export default FormField;
