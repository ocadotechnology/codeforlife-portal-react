import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  ThemeProvider,
  createTheme,
  useTheme
} from '@mui/material';

import PageSection from '../../components/PageSection';

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
      <PageSection bgcolor={theme.palette.primary.main}>
        <Grid
          container
          spacing={1}
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
          <Grid xs={12} order={{ xs: 4 }} className='flex-center'>
            <Typography marginTop={3}>
              © Ocado Group {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </PageSection>
    </ThemeProvider>
  );
};

export default Footer;
