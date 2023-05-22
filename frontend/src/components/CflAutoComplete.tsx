import React from 'react';
import { Autocomplete, AutocompleteProps, ChipTypeMap } from '@mui/material';

import CflTextField, { CflTextFieldProps } from './CflTextField';

export interface CflAutocompleteProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    'renderInput' | 'onChange'
  > {
  cflTextFieldProps: CflTextFieldProps;
}

const CflAutocomplete = <
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>({
  cflTextFieldProps,
  defaultValue,
  ...otherAutocompleteProps
}: CflAutocompleteProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo,
  ChipComponent
>): JSX.Element => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <Autocomplete
      value={value}
      onChange={(event, value) => {
        setValue(value);
      }}
      renderInput={(params) => (
        <CflTextField value={value} {...params} {...cflTextFieldProps} />
      )}
      {...otherAutocompleteProps}
    />
  );
};

export default CflAutocomplete;
