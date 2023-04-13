import React from 'react';
import {
  Container,
  Unstable_Grid2 as Grid,
  GridDirection,
  Typography
} from '@mui/material';

import { ResponsiveStyleValue } from '@mui/system';
import { Image } from 'codeforlife/lib/esm/components';
import RRBeginnerImage from 'images/rr_beginner.png';

const LevelInfo: React.FC<{
  level: { difficulty: string, textcolor: string, bgcolor: string },
  card: { img: { alt: string, src: string }, description: string }
  children: React.ReactNode,
  direction?: ResponsiveStyleValue<GridDirection>
}> = ({ level, card, children, direction }) => {
  return <>
    <Grid xs={12} bgcolor={level.bgcolor} sx={{ maxHeight: '60px' }}>
      <Container maxWidth='lg'>
        <Typography variant='h4' color={level.textcolor}>
          &lt; {level.difficulty} &gt;
        </Typography>
      </Container>
    </Grid>
    <Grid
      container
      spacing={{ xs: 2, lg: 3 }}
      display='flex'
      direction={direction}
    >
      <Grid xs={12} md={6}>
        {children}
      </Grid>
      <Grid xs={12} md={6} className='flex-center'>
        <Image
          alt={card.img.alt}
          src={card.img.src}
        />
      </Grid>
    </Grid>
  </>;
};

const LevelInfos: React.FC = () => {
  return <>
    <LevelInfo
      level={{
        difficulty: 'Beginner',
        textcolor: 'White',
        bgcolor: '#00a3e0'
      }}
      card={{
        img: { alt: 'RR beginner image', src: RRBeginnerImage },
        description: 'rr begin'
      }}
    >
      RR beginner
    </LevelInfo>
  </>;
};

export default LevelInfos;
