import React from 'react';
import { InputAdornment } from '@mui/material';
import { PersonOutlined } from '@mui/icons-material';
import { TextField } from 'codeforlife/lib/esm/components/form';
import * as Yup from 'yup';

const StudentNameField: React.FC<{
  name?: string
  helperText?: string
  readOnly?: boolean
  style?: any
}> = ({
  name = 'name',
  helperText = 'Choose a name',
  readOnly = false,
  style = undefined
}) => {
  return (
    <TextField
      required
      name={name}
      helperText={helperText}
      placeholder='Student name'
      validate={Yup
        .string()
        .matches(/^[a-zA-Z0-9-_ ]{1,150}$/gm, 'Name may only contain letters, numbers, dashes, underscores, and spaces.')
      }
      InputProps={{
        style,
        readOnly,
        endAdornment: (
          <InputAdornment position="end">
            <PersonOutlined />
          </InputAdornment>
        )
      }}
    />
  );
};

export default StudentNameField;
