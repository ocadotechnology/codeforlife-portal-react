import React from 'react';
import {
  Typography,
  Stack,
  Toolbar,
  Unstable_Grid2 as Grid,
  useTheme
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

export interface PageBannerProps {
  text: { title: string, content: string },
  img: { alt: string, src: string },
};

const PageBanner: React.FC<PageBannerProps> = ({
  text, img
}) => {
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
          <Typography variant='h5' style={{ color: 'white' }} mb={0}>
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

export default PageBanner;
