import React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Icon,
  useTheme
} from '@mui/material';
import {
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';

import CflTooltip from '../CflTooltip';
import CflField, { CflFieldProps } from './CflField';

export type CflTextFieldProps = (
  Omit<TextFieldProps, 'name'> &
  Omit<CflFieldProps, (
    'as' |
    'asProps' |
    'component' |
    'render' |
    'children' |
    'errorMessageProps' |
    'stackProps'
  )>
);

const CflTextField: React.FC<CflTextFieldProps> = ({
  name,
  type,
  tooltipProps,
  errorIconProps = { color: 'error' },
  InputProps = {},
  onKeyUp,
  sx,
  ...otherTextFieldProps
}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState({
    field: '',
    errorMessage: '',
    newError: false
  });

  const resetErrorMessage = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    const field = (event.target as HTMLTextAreaElement).value;
    if (value.field === '' && field !== '') {
      setValue({ field, newError: false, errorMessage: '' });
    } else if (value.newError) {
      setValue({ ...value, field, newError: false });
    } else if (field !== '') {
      setValue({ ...value, field, errorMessage: '' });
    }
  };

  let {
    endAdornment,
    ...otherInputProps
  } = InputProps;

  if (value.errorMessage !== '') {
    endAdornment = (
      <>
        {endAdornment}
        <InputAdornment position='end'>
          <CflTooltip title={value.errorMessage} {...tooltipProps}>
            <Icon {...errorIconProps}>
              <ErrorOutlineIcon />
            </Icon>
          </CflTooltip>
        </InputAdornment>
      </>
    );
  }

  if (onKeyUp === undefined) {
    onKeyUp = resetErrorMessage;
  } else {
    const originalOnKeyUp = onKeyUp;
    onKeyUp = (event) => {
      originalOnKeyUp(event);
      resetErrorMessage(event);
    };
  }

  const textFieldProps: TextFieldProps = {
    name,
    type,
    onKeyUp,
    InputProps: {
      endAdornment,
      ...otherInputProps
    },
    sx: {
      ...sx,
      '& .MuiOutlinedInput-root.Mui-focused > fieldset': {
        borderColor: (value.errorMessage === '')
          ? '#000'
          : theme.palette.error.main
      }
    },
    ...otherTextFieldProps
  };

  return (
    <CflField
      name={name}
      type={type}
      as={TextField}
      asProps={textFieldProps}
      errorMessageProps={{
        render: (errorMessage) => {
          setValue({ ...value, errorMessage, newError: true });
          return <></>;
        }
      }}
    />
  );
};

export default CflTextField;
