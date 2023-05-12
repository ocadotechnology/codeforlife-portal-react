import React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Tooltip,
  Icon,
  useTheme
} from '@mui/material';
import {
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';

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
  const [errorMessage, setErrorMessage] = React.useState('');
  const [valueChanged, setValueChanged] = React.useState(false);

  const resetErrorMessage = (): void => {
    if (valueChanged) {
      setErrorMessage('');
    } else {
      setValueChanged(true);
    }
  };

  let {
    endAdornment,
    ...otherInputProps
  } = InputProps;

  if (errorMessage !== '') {
    endAdornment = (
      <>
        {endAdornment}
        <InputAdornment position='end'>
          <Tooltip title={errorMessage} {...tooltipProps}>
            <Icon {...errorIconProps}>
              <ErrorOutlineIcon />
            </Icon>
          </Tooltip>
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
      resetErrorMessage();
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
        borderColor: (errorMessage === '')
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
          setErrorMessage(errorMessage);
          setValueChanged(false);
          return <></>;
        }
      }}
    />
  );
};

export default CflTextField;
