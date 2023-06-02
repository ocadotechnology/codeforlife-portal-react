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

const SchoolPostcodeField: React.FC = () => {
  return (
    <TextField
      required
      name='postcode'
      helperText='Postcode / Zipcode'
      placeholder='Postcode / Zipcode'
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

export default SchoolPostcodeField;
