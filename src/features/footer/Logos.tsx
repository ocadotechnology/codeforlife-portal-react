import React from 'react';
import {
  Unstable_Grid2 as Grid,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';
import CflLogo from 'images/cfl_logo_white_landscape.png';
import { ReactComponent as OcadoGroupIcon } from 'images/ocado_group_white.svg';
import { ReactComponent as TwitterIcon } from 'images/twitter_icon.svg';
import { ReactComponent as FbIcon } from 'images/facebook_icon.svg';

const Logos: React.FC = () => {
  const theme = useTheme();

  let [iconSize, iconWidth] = [60, '100%'];
  if (useMediaQuery(theme.breakpoints.only('sm'))) {
    iconSize = 40; iconWidth = '66%';
  }

  return (
    <Grid container>
      <Grid xs={12} order={{ xs: 2, sm: 1 }}>
        <Image
          alt='Code for Life logo'
          src={CflLogo}
        />
      </Grid>
      <Grid
        xs={3} xsOffset={3} smOffset={0}
        order={{ xs: 1, sm: 2 }}
        className='flex-center'
      >
        <IconButton sx={{ padding: 0 }}>
          <FbIcon fontSize={iconSize} color='white' />
        </IconButton>
      </Grid>
      <Grid
        xs={3} order={{ xs: 1, sm: 2 }}
        className='flex-center'
      >
        <IconButton sx={{ padding: 0 }}>
          <TwitterIcon fontSize={iconSize} color='white' />
        </IconButton>
      </Grid>
      <Grid
        xs={12} sm={6} order={{ xs: 4 }}
        className='flex-center'
      >
        <IconButton>
          <OcadoGroupIcon color='white' width={iconWidth} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Logos;
