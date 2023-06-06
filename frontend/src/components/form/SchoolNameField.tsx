import React from 'react';
import {
  InputAdornment
} from '@mui/material';
import {
  Business as BusinessIcon
} from '@mui/icons-material';

import {
  TextField
} from 'codeforlife/lib/esm/components/form';

const SchoolNameField: React.FC = () => {
  return (
    <TextField
      required
      name='school'
      helperText='Name of school or club'
      placeholder='Name of school or club'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <BusinessIcon />
          </InputAdornment>
        )
      }}
    />
  );
};

export default SchoolNameField;
