import React from 'react';
import {
  InputAdornment
} from '@mui/material';
import {
  PeopleAlt as PeopleAltIcon
} from '@mui/icons-material';

import {
  TextField
} from 'codeforlife/lib/esm/components/form';

const ClassNameField: React.FC = () => {
  return (
    <TextField
      required
      name='class'
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
