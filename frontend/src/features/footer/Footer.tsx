import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Container,
  Stack
} from '@mui/material';

import { ThemedBox } from 'codeforlife/lib/esm/theme';

import { themeOptions } from '../../app/theme';
import Links from './Links';
import Logos from './Logos';
import SignUp from './SignUp';

const Footer: React.FC = () => {
  const spacing = 5;

  return (
    <ThemedBox
      id='footer'
      userType='teacher'
      options={themeOptions}
    >
      <Container>
        <Grid container spacing={spacing}>
          <Grid xs={12} sm={8}>
            <Stack spacing={spacing}>
              <Links />
              <SignUp />
            </Stack>
          </Grid>
          <Grid xs={12} sm={4}>
            <Logos />
          </Grid>
          <Grid xs={12}>
            <Typography
              textAlign='center'
              variant='body2'
            >
              © Ocado Group {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemedBox>
  );
};

export default Footer;
