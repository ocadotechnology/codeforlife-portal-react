import React from 'react';
import {
  Typography,
  Stack,
  Toolbar
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import AboutUsHeroImage from 'images/about_us_hero_hexagon.png';

export const PageBanner: React.FC = () => (
  <Toolbar>
    <Stack sx={{ py: 8, mr: 2 }}>
      <Typography variant='h2' style={{ color: 'white' }}>
        About Code for Life
      </Typography>
      <Typography variant='h5' style={{ color: 'white' }}>
        Code For Life gives everyone the ability to shape technology&apos;s future
      </Typography>
    </Stack>
    <Image
      alt='aboutUsHero'
      src={AboutUsHeroImage}
      boxProps={{
        display: { xs: 'none', md: 'block' },
        maxWidth: '320px'
      }}
    />
  </Toolbar>
);
