import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import CflLogo from '../../images/cfl_logo_white_landscape.png';
import OcadoGroupIcon from '../../images/ocado_group_white.svg';
import TwitterIcon from '../../images/twitter_icon.svg';
import FbIcon from '../../images/facebook_icon.svg';

const Logos: React.FC = () => {
  const boxProps = {
    maxWidth: { xs: '50%', sm: '80%' },
    style: { filter: 'invert(1)' }
  };

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
        <Image
          alt='Facebook'
          src={FbIcon}
          boxProps={boxProps}
          href={process.env.REACT_APP_FACEBOOK_HREF}
          hrefInNewTab
        />
      </Grid>
      <Grid
        xs={3} order={{ xs: 1, sm: 2 }}
        className='flex-center'
      >
        <Image
          alt='Twitter'
          src={TwitterIcon}
          boxProps={boxProps}
          href={process.env.REACT_APP_TWITTER_HREF}
          hrefInNewTab
        />
      </Grid>
      <Grid
        xs={12} sm={6} order={{ xs: 4 }}
        className='flex-center'
      >
        <Image
          alt='Ocado Group'
          src={OcadoGroupIcon}
          boxProps={{ maxWidth: { xs: '50%', sm: '100%' } }}
          href={process.env.REACT_APP_OCADO_GROUP_HREF}
          hrefInNewTab
        />
      </Grid>
    </Grid>
  );
};

export default Logos;
