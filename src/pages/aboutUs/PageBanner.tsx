import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import { Image } from 'codeforlife/lib/esm/components';

export const PageBanner: React.FC<{
  img: { alt: string, src: string }
  title: string
  description: string
}> = ({ img, title, description }) => (
  <Grid container xs={12} display='flex' spacing={0}>
    <Grid container xs={12} md={6} p={2}>
      <Grid xs={0} md={4} />
      <Grid xs={12} md={8}>
        <Grid xs={12}>
          <Typography variant='h2' style={{ color: 'white' }} mt={2}>
            {title}
          </Typography>
        </Grid>
        <Grid xs={12} my={3}>
          <Typography variant='h5' style={{ color: 'white' }}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid xs={0} md={6} m={0} p={0} display='flex' pl={{ lg: 10 }}>
      <Image alt={img.alt} src={img.src} boxProps={{ maxWidth: '370px' }} />
    </Grid>
  </Grid>
);
