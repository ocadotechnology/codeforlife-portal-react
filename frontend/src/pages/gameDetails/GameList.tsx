import React from 'react';
import {
  Unstable_Grid2 as Grid, Typography
} from '@mui/material';

import CflCard from 'components/CflCard';
import RRLogoGreenImage from '../../images/RR_logo_green.svg';
import KuronoLogoGreyImage from '../../images/kurono_logo_grey_background.svg';
import { paths } from 'app/router';

const GameList: React.FC = () => {
  return (
    <Grid container spacing={4} justifyContent='center'>
      <Grid xs={12} marginTop={3}>
        <Typography variant='h4' textAlign='center'>Your class games</Typography>
      </Grid>
      <Grid xs={12} md={4}>
        <CflCard
          text={{
            title: 'Rapid Router',
            content: 'Rapid Router guides you, and makes learning to code easy and great fun. Using Blockly, you can advance through the levels to become an Ocado delivery hero.'
          }}
          mediaProps={{ title: 'RR beginner image', image: RRLogoGreenImage }}
          buttonProps={{
            children: 'Play',
            href: paths.rapidRouter
          }}
        />
      </Grid >
      <Grid xs={12} md={4}>
        <CflCard
          text={{
            title: 'Kurono',
            content: 'It is the year 2405 and the museum is in big trouble! The priceless artifacts are lost and scattered across timelines. Your team’s mission is to travel through time and bring them back into the museum.'
          }}
          mediaProps={{ title: 'RR beginner image', image: KuronoLogoGreyImage }}
          buttonProps={{
            children: 'Play',
            href: paths.home // TODO: change to Kurono url
          }}
        />
      </Grid>
    </Grid>
  );
};

export default GameList;
