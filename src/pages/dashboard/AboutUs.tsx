import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
  Button
} from '@mui/material';

import { Image } from 'codeforlife/lib/esm/components';

import PieChartIcon from 'images/icon_piechart.png';
import ControllerIcon from 'images/icon_controller.png';
import TicketIcon from 'images/icon_free.png';
import GlobeIcon from 'images/icon_globe.png';

const Column: React.FC<{
  img: { alt: string, src: string },
  text: string
}> = ({ img, text }) => (
  <Grid xs={12} sm={6} md={3}>
    <Stack alignItems='center'>
      <Image alt={img.alt} src={img.src} boxProps={{ maxWidth: '200px' }} />
      <Typography textAlign='center'>
        {text}
      </Typography>
    </Stack>
  </Grid>
);

const AboutUs: React.FC = () => {
  return (
    <Grid container spacing={1} padding={3}>
      <Grid xs={12} className='flex-center'>
        <Typography variant='h4' textAlign='center'>
          Giving everyone the ability to shape technology&apos;s future
        </Typography>
      </Grid>
      <Column
        img={{ alt: 'pie chart', src: PieChartIcon }}
        text="Just 16% of university computer science graduates (2018/19) in the UK were women*, we want to change that."
      />
      <Column
        img={{ alt: 'game controller', src: ControllerIcon }}
        text="Gamification helps children learn whilst having fun!"
      />
      <Column
        img={{ alt: 'free ticket', src: TicketIcon }}
        text="That's right, free forever: our gift to you! We're also Open Source."
      />
      <Column
        img={{ alt: 'earth', src: GlobeIcon }}
        text="Code for Life has over 350,000 registered users across the world."
      />
      <Grid xs={12} display='flex' justifyContent='end'>
        <Button style={{ marginRight: 20 }}>
          About us &gt;
        </Button>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
