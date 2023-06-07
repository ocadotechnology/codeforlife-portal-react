import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Box,
  Container,
  typographyClasses
} from '@mui/material';

import { primary } from 'codeforlife/lib/esm/theme/colors';

import Links from './Links';
import Logos from './Logos';
import SignUp from './SignUp';

const Footer: React.FC = () => {
  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundColor: primary[500],
      [`.${typographyClasses.root}`]: {
        fontWeight: '600 !important',
        color: 'white !important'
      }
    }}>
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
    </Box>
  );
};

export default Footer;
