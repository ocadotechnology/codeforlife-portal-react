import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  ThemeProvider,
  createTheme,
  useTheme
} from '@mui/material';

import Links from './Links';
import Logos from './Logos';
import SignUp from './SignUp';

const Footer: React.FC = () => {
  const theme = createTheme(useTheme(), {
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            color: 'white'
          }
        }
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        rowSpacing={{ xs: 2, sm: 1 }}
        columnSpacing={1}
        padding={0}
      >
        <Grid xs={12} sm={8} order={{ xs: 1 }}>
          <Links />
        </Grid>
        <Grid xs={12} sm={4} order={{ xs: 3, sm: 2 }}>
          <Logos />
        </Grid>
        <Grid xs={12} sm={8} order={{ xs: 2, sm: 3 }}>
          <SignUp />
        </Grid>
        <Grid xs={12} order={{ xs: 4 }}>
          <Typography marginTop={3} textAlign='center'>
            © Ocado Group {new Date().getFullYear()}
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Footer;
