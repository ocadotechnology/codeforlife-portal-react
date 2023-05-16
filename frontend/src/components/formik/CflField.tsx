import React from 'react';
import {
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

import CflTooltip, { CflTooltipProps } from '../CflTooltip';

export interface CflFieldProps extends FieldConfig<any> {
  stackProps?: StackProps,
  tooltipProps?: Omit<CflTooltipProps, 'title' | 'children'>,
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
    const {
      children = <ErrorOutlineIcon />,
      ...otherErrorIconProps
    } = errorIconProps;

    render = (errorMessage: string) => (
      <CflTooltip title={errorMessage} {...tooltipProps}>
        <Icon {...otherErrorIconProps}>
          {children}
        </Icon>
      </CflTooltip>
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
