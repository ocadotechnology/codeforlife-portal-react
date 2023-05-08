import React from 'react';
import {
  TextField,
  TextFieldProps,
  InputAdornment,
  Tooltip,
  Icon
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
    'errorMessageProps'
  )>
);

const CflTextField: React.FC<CflTextFieldProps> = ({
  name,
  stackProps,
  tooltipProps,
  errorIconProps = { color: 'error' },
  InputProps = {},
  ...otherTextFieldProps
}) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [valueChanged, setValueChanged] = React.useState(false);

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

  const textFieldProps: TextFieldProps = {
    InputProps: {
      endAdornment,
      ...otherInputProps
    },
    onKeyUp: () => {
      if (valueChanged) {
        setErrorMessage('');
      } else {
        setValueChanged(true);
      }
    },
    ...otherTextFieldProps
  };

  return (
    <CflField
      name={name}
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
