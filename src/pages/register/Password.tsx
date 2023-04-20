import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';

import SecurityIcon from '@mui/icons-material/Security';
import CircleIcon from '@mui/icons-material/Circle';

const Password: React.FC = () => {
  return (
    <>
      <TextField id='password'
        type='password'
        placeholder='Password'
        variant='outlined'
        size='small'
        required
        InputProps={{
          endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
        }}
      />
      <Typography paddingY={1}>
        Enter a password
      </Typography>

      <TextField id='password-repeat'
        type='password'
        placeholder='Repeat password'
        variant='outlined'
        size='small'
        required
        InputProps={{
          endAdornment: <InputAdornment position='end'><SecurityIcon /></InputAdornment>
        }}
      />
      <Typography paddingTop={1}>
        Repeat password
      </Typography>
      <Grid xs={12} display='flex' justifyContent='center' alignItems='center'>
        <CircleIcon color='error' stroke='white' strokeWidth={1} />
        &nbsp;&nbsp;<Typography fontSize={18} fontWeight={500} margin={0}>No password!</Typography>
      </Grid>
    </>
  );
};

export default Password;
