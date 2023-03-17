import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  EmailOutlined as EmailIcon
} from '@mui/icons-material';

import theme from 'app/theme';

const SignUp: React.FC = () => (
  <ThemeProvider theme={createTheme(theme, {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: 'white'
          }
        }
      }
    }
  })}>
    <Grid container>
      <Grid xs={12}>
        <Typography>
          Sign up to receive updates about Code for Life games and teaching resources.
        </Typography>
      </Grid>
      <Grid xs={12}>
        <TextField
          required
          id='email'
          label='Email'
          type='email'
          variant='filled'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <EmailIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid xs={12} sm={10}>
        <FormControlLabel
          control={<Checkbox required style={{ color: 'white' }} />}
          label='Please confirm that you are over 18.'
        />
      </Grid>
      <Grid xs={12} sm={2}>
        <Button type='submit' fullWidth>
          Sign up
        </Button>
      </Grid>
    </Grid>
  </ThemeProvider>
);

export default SignUp;
