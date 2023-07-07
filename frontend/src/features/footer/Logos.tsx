import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  IconButton,
  Icon,
  IconProps,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  FacebookRounded as FacebookRoundedIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import CflLogo from '../../images/cfl_logo_white_landscape.png';
import OcadoGroupIcon from '../../images/ocado_group_white.svg';

const SocialMediaIconButton: React.FC<{
  href: string;
  rounded?: boolean;
  children: React.ReactElement<IconProps, typeof Icon>;
}> = ({ href, rounded = false, children }) => {
  const theme = useTheme();

  function getFontSize(fontSize: number): string {
    return `${rounded ? fontSize - 7 : fontSize}px`;
  }

  return (
    <IconButton
      href={href}
      target='_blank'
      sx={{ padding: 0 }}
    >
      {React.cloneElement(children, {
        sx: {
          fontSize: {
            xs: getFontSize(50),
            sm: getFontSize(42),
            md: getFontSize(50)
          },
          borderRadius: '50%',
          border: rounded ? '3px solid white' : undefined,
          color: `${rounded ? theme.palette.primary.main : 'white'} !important`,
          backgroundColor: rounded ? 'white !important' : undefined,
          // Icons have margin pre-included which messes up alignment
          margin: rounded ? 0 : '-4px !important'
        }
      })}
    </IconButton>
  );
};

const Logos: React.FC = () => {
  const theme = useTheme();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const spacing = { xs: 3, md: 1.5 };

  const ocadoGroupImage = (
    <Image
      alt='Ocado Group'
      src={OcadoGroupIcon}
      style={{ width: 'auto' }}
      maxHeight={{ xs: '50px', sm: '40px', md: '50px' }}
      marginLeft={{ xs: 0, md: 'auto !important' }}
      href={process.env.REACT_APP_OCADO_GROUP_HREF}
      hrefInNewTab
    />
  );

  return (
    <Grid container spacing={spacing}>
      <Grid
        xs={12}
        order={{ xs: 2, md: 1 }}
        className='flex-center'
      >
        <Image
          alt='Code for Life logo'
          src={CflLogo}
          maxWidth={{ xs: '300px', sm: '100%' }}
        />
      </Grid>
      <Grid xs={12} order={{ xs: 1, md: 2 }}>
        <Stack
          direction='row'
          width='100%'
          spacing={spacing}
          justifyContent={{ xs: 'center', md: 'normal' }}
        >
          <SocialMediaIconButton href={
            process.env.REACT_APP_FACEBOOK_HREF as string
          }>
            <FacebookRoundedIcon />
          </SocialMediaIconButton>
          <SocialMediaIconButton rounded href={
            process.env.REACT_APP_TWITTER_HREF as string
          }>
            <TwitterIcon />
          </SocialMediaIconButton>
          <SocialMediaIconButton rounded href={
            process.env.REACT_APP_INSTAGRAM_HREF as string
          }>
            <InstagramIcon />
          </SocialMediaIconButton>
          {!downMD && ocadoGroupImage}
        </Stack>
      </Grid>
      {downMD &&
        <Grid
          xs={12}
          order={3}
          className='flex-center'
        >
          {ocadoGroupImage}
        </Grid>
      }
    </Grid>
  );
};

export default Logos;
