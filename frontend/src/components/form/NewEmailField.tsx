import React from 'react';
import {
  InputAdornment,
  InputBaseProps,
  Grid
} from '@mui/material';
import {
  EmailOutlined
} from '@mui/icons-material';
import {
  string as YupString,
  StringSchema as YupStringSchema
} from 'yup';
import { TextFieldProps, TextField } from 'codeforlife/lib/esm/components/form';
import { wrap } from 'codeforlife/lib/esm/helpers';

interface EmailFieldProps extends Omit<TextFieldProps, (
  'type' |
  'name'
  )> { }

interface ConfirmEmailFieldProps extends Omit<EmailFieldProps, (
  'validate'
  )> { }

export interface NewEmailFieldProps {
  emailFieldProps?: EmailFieldProps,
  confirmEmailFieldProps?: ConfirmEmailFieldProps
}

// TODO: Move this file to JS package?
const NewEmailField: React.FC<NewEmailFieldProps & {
  index?: number;
}> = ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  emailFieldProps = {} as EmailFieldProps,
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  confirmEmailFieldProps = {} as ConfirmEmailFieldProps,
  index
}) => {
  const [validate, setValidate] = React.useState<YupStringSchema>();

  const endAdornment: InputBaseProps['endAdornment'] = (
    <InputAdornment position='end'>
      <EmailOutlined />
    </InputAdornment>
  );

  emailFieldProps.onKeyUp = wrap({
    after: (event: React.KeyboardEvent<HTMLDivElement>) => {
      setValidate(YupString().test(
        'matches-email',
        'doesn\'t match email',
        (confirmEmail) => {
          const email = (event.target as HTMLTextAreaElement).value;
          return email === confirmEmail;
        }
      ));
    }
  }, emailFieldProps.onKeyUp);

  emailFieldProps.InputProps = {
    endAdornment,
    ...('InputProps' in emailFieldProps && emailFieldProps.InputProps)
  };

  confirmEmailFieldProps.InputProps = {
    endAdornment,
    ...('InputProps' in confirmEmailFieldProps && confirmEmailFieldProps.InputProps)
  };

  return <>
    <Grid item sm={6}>
      <TextField
        type='email'
        name={(index === undefined) ? 'email' : `email${index}`}
        placeholder="Enter email address"
        helperText="New email address"
        required
        {...emailFieldProps}
      />
    </Grid>
    {/* TODO: Replace with proper margin? */}
    <Grid item sm={6} sx={{ mb: '40px' }}>
      <TextField
        type='email'
        name={(index === undefined) ? 'confirmEmail' : `confirmEmail${index}`}
        placeholder="Confirm email address"
        helperText="Confirm email address"
        required
        validate={validate}
        {...confirmEmailFieldProps}
      />
    </Grid>
  </>;
};

export default NewEmailField;
