import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Container
} from '@mui/material';

import { ThemedBox } from 'codeforlife/lib/esm/theme';
import { getStyleOverrides } from 'codeforlife/lib/esm/helpers';

import { themeOptions } from '../../app/theme';
import Links from './Links';
import Logos from './Logos';
import SignUp from './SignUp';

const Footer: React.FC = () => {
  return (
    <ThemedBox
      id='footer'
      userType='teacher'
      options={{
        ...themeOptions,
        components: {
          ...themeOptions.components,
          MuiTypography: {
            ...themeOptions.components?.MuiTypography,
            styleOverrides: {
              ...themeOptions.components?.MuiTypography?.styleOverrides,
              root: ({ ownerState }) => ({
                ...getStyleOverrides(ownerState, 'MuiTypography', 'root', themeOptions.components),
                fontWeight: '600 !important'
              })
            }
          }
        }
      }}
    >
      <Container>
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
      </Container>
    </ThemedBox>
  );
};

export default Footer;
