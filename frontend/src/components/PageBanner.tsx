import React from 'react';
import {
  Typography,
  Stack,
  useTheme,
  Button,
  ButtonProps,
  IconButton
} from '@mui/material';
import {
  InfoOutlined as InfoOutlinedIcon,
  CloseOutlined as CloseOutlinedIcon
} from '@mui/icons-material';

import { Image, ImageProps } from 'codeforlife/lib/esm/components';

import PageSection from './PageSection';

export interface PageBannerProps {
  text: { title: string, content: string };
  notification?: React.ReactElement;
  img?: ImageProps;
  btn?: ButtonProps;
  bgcolor?: 'primary' | 'secondary' | 'tertiary';
};

const PageBanner: React.FC<PageBannerProps> = ({
  text,
  notification,
  img,
  btn,
  bgcolor = 'primary'
}) => {
  const theme = useTheme();
  const [showNotification, setShowNotification] = React.useState(true);

  const contrastText = theme.palette[bgcolor].contrastText;

  return <>
    <PageSection
      bgcolor={theme.palette[bgcolor].main}
      py={false}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap={2}
      >
        <Stack
          py={{
            xs: 8,
            md: img !== undefined ? 0 : 10
          }}
          textAlign={img !== undefined ? 'start' : 'center'}
        >
          <Typography
            variant='h2'
            color={contrastText}
          >
            {text.title}
          </Typography>
          <Typography
            color={contrastText}
            variant='h5'
            mb={btn !== undefined ? undefined : 0}
          >
            {text.content}
          </Typography>
          {btn !== undefined && <Button {...btn} />}
        </Stack>
        {img !== undefined &&
          <Image
            {...img}
            display={{ xs: 'none', md: 'block' }}
            maxWidth='320px'
            marginLeft='auto'
          />
        }
      </Stack>
    </PageSection>
    {notification !== undefined && showNotification &&
      <PageSection
        bgcolor={theme.palette[bgcolor].light}
        py={false}
      >
        <Stack
          direction='row'
          alignItems='center'
          gap={2}
          marginY={1}
        >
          <InfoOutlinedIcon htmlColor={contrastText} />
          <Typography
            fontWeight={600}
            color={contrastText}
            mb={0}
          >
            {notification}
          </Typography>
          <IconButton
            style={{ marginLeft: 'auto' }}
            onClick={() => { setShowNotification(false); }}
          >
            <CloseOutlinedIcon htmlColor={contrastText} />
          </IconButton>
        </Stack>
      </PageSection>
    }
  </>;
};

export default PageBanner;
