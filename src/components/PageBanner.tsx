import React from 'react';
import {
  Typography,
  Stack,
  Toolbar,
  useTheme,
  Button,
  ButtonProps
} from '@mui/material';

import { Image, ImageProps } from 'codeforlife/lib/esm/components';

import PageSection from './PageSection';

export interface PageBannerProps {
  text: { title: string, content: string },
  img: ImageProps
  btn?: ButtonProps
};

const PageBanner: React.FC<PageBannerProps> = ({
  text, img, btn
}) => {
  const theme = useTheme();

  const btnExists = btn !== undefined;

  return (
    <PageSection
      bgcolor={theme.palette.primary.main}
      py={false}
    >
      <Toolbar>
        <Stack
          py={{ xs: 8, md: 0 }}
          mr={{ xs: 0, md: 2 }}
        >
          <Typography
            variant='h2'
            style={{ color: 'white' }}
          >
            {text.title}
          </Typography>
          <Typography
            variant='h5'
            style={{ color: 'white' }}
            mb={btnExists ? undefined : 0}
          >
            {text.content}
          </Typography>
          {btnExists &&
            <Button {...btn} />
          }
        </Stack>
        <Image
          {...img}
          boxProps={{
            display: { xs: 'none', md: 'block' },
            maxWidth: '320px'
          }}
        />
      </Toolbar>
    </PageSection>
  );
};

export default PageBanner;
