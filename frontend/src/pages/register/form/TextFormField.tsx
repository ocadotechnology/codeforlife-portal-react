import React from 'react';
import {
  TextField,
  TextFieldProps
} from '@mui/material';

import FormField, { FormFieldProps } from '../../../components/FormField';

const TextFormField: React.FC<TextFieldProps & FormFieldProps & {
  placeholder: NonNullable<TextFieldProps['placeholder']>,
  helperText: NonNullable<TextFieldProps['helperText']>
}> = ({ name, ...otherProps }) => (
  <FormField
    name={name}
    as={TextField}
    size='small'
    FormHelperTextProps={{ style: { color: 'white' } }}
    {...otherProps}
  />
);

export default TextFormField;
