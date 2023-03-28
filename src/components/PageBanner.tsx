import React from 'react';
import {
  Typography,
  Stack,
  Toolbar,
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

type GridElement = React.ReactElement<typeof Grid>;

export interface PageBannerProps {
  text: { title: string, content: GridElement | GridElement[] },
  img: { alt: string, src: string },
};

export const PageBanner: React.FC<PageBannerProps> = ({ text, img }) => {
  const theme = useTheme();
  return (
    <Grid
      xs={12}
      bgcolor={theme.palette.primary.main}
      p={0}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Toolbar>
        <Stack sx={{ py: 8, mr: 2 }}>
          <Typography variant='h2' style={{ color: 'white' }}>
            {text.title}
          </Typography>
          <Typography variant='h5' style={{ color: 'white' }}>
            {text.content}
          </Typography>
        </Stack>
        <Image
          alt={img.alt}
          src={img.src}
          boxProps={{
            display: { xs: 'none', md: 'block' },
            maxWidth: '320px'
          }}
        />
      </Toolbar>
    </Grid>
  );
};
