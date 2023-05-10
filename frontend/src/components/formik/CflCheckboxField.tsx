import React from 'react';
import {
  FormControlLabel,
  FormControlLabelProps,
  Checkbox,
  CheckboxProps,
  IconProps
} from '@mui/material';
import {
  Error as ErrorIcon
} from '@mui/icons-material';

import { formStyleOverrides } from '../../app/theme';
import CflField, { CflFieldProps } from './CflField';

export type CflCheckboxFieldProps = (
  Omit<CflFieldProps, (
    'type' |
    'as' |
    'asProps' |
    'component' |
    'render' |
    'children' |
    'errorIconProps' |
    'errorMessageProps' |
    'stackProps'
  )> &
  CheckboxProps & {
    errorIconProps?: Omit<IconProps, 'children'>,
    formControlLabelProps: Omit<FormControlLabelProps, 'control'>
  }
);

const CflCheckboxField: React.FC<CflCheckboxFieldProps> = ({
  name,
  tooltipProps,
  errorIconProps = { style: { color: 'white' } },
  formControlLabelProps,
  ...checkboxProps
}) => {
  return (
    <CflField
      name={name}
      type='checkbox'
      // @ts-expect-error prematurely complains about missing props.
      as={FormControlLabel}
      asProps={{
        control: <Checkbox {...checkboxProps} />,
        ...formControlLabelProps
      }}
      stackProps={{
        direction: 'row',
        style: {
          marginBottom: formStyleOverrides.marginBottom
        }
      }}
      tooltipProps={tooltipProps}
      errorIconProps={{
        style: {
          margin: 'auto 12px auto 0px',
          ...errorIconProps.style
        },
        children: <ErrorIcon />,
        ...errorIconProps
      }}
    />
  );
};

export default CflCheckboxField;
