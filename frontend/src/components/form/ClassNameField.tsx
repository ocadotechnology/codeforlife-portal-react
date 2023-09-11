import {
  PeopleAlt as PeopleAltIcon
} from '@mui/icons-material';
import {
  InputAdornment
} from '@mui/material';
import React from 'react';

import {
  TextField
} from 'codeforlife/lib/esm/components/form';

export interface ClassNameFieldProps {
  name?: string;
}

const ClassNameField: React.FC<ClassNameFieldProps> = ({
  name = 'class'
}) => {
  return (
    <TextField
      required
      name={name}
      placeholder='Class name'
      helperText='Enter a class name'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <PeopleAltIcon />
          </InputAdornment>
        )
      }}
    />
  );
};

export default ClassNameField;
