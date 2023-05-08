import React from 'react';
import {
  Tooltip,
  TooltipProps,
  Stack,
  StackProps,
  Icon,
  IconProps
} from '@mui/material';
import {
  ErrorOutline as ErrorOutlineIcon
} from '@mui/icons-material';
import {
  Field,
  FieldConfig,
  ErrorMessage,
  ErrorMessageProps
} from 'formik';

export interface CflFieldProps extends FieldConfig<any> {
  stackProps?: StackProps,
  tooltipProps?: Omit<TooltipProps, 'title'>,
  errorIconProps?: IconProps
  errorMessageProps?: Omit<ErrorMessageProps, (
    'name' |
    'children'
  )> & {
    afterField?: boolean
  },
  asProps?: Record<string, any>
}

const CflField: React.FC<CflFieldProps> = ({
  name,
  stackProps,
  tooltipProps,
  errorIconProps = { color: 'error' },
  errorMessageProps = {
    afterField: true,
    render: undefined,
    children: undefined
  },
  asProps,
  ...otherFieldProps
}) => {
  let {
    afterField,
    render,
    ...otherErrorMessageProps
  } = errorMessageProps;

  if (render === undefined) {
    render = (errorMessage: string) => (
      <Tooltip title={errorMessage} {...tooltipProps}>
        <Icon {...errorIconProps}>
          <ErrorOutlineIcon />
        </Icon>
      </Tooltip>
    );
  }

  const errorMessage = (
    <ErrorMessage
      name={name}
      render={render}
      {...otherErrorMessageProps}
    />
  );

  return (
    <Stack {...stackProps}>
      {!afterField && errorMessage}
      <Field name={name} {...otherFieldProps} {...asProps} />
      {afterField && errorMessage}
    </Stack>
  );
};

export default CflField;
