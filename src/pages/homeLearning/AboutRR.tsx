import React from 'react';
import {
  Button,
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import { paths } from 'app/router';

const AboutRR: React.FC = () => (
  <Grid container spacing={1} padding={3}>
    <Grid xs={12}>
      <Typography variant='h4' textAlign='center'>
        About Rapid Router
      </Typography>
    </Grid>
    <Grid container xs={12} spacing={{ xs: 0, md: 4 }}>
      <Grid xs={12} md={6}>
        <Typography>
          Rapid Router is our shopping delivery game that teaches children aged 5-14 to learn how to code using Blockly and Python.
        </Typography>
        <Typography>
          The game and lessons support the English National Curriculum Computing strand, and Teachers across the world love them.
        </Typography>
        <Typography>
          Now, we&apos;ve made lessons available for parents and caregivers to teach at home, so we can #KeepKidsCoding. They&apos;re free and easy, but most of all, they&apos;re fun!
        </Typography>
      </Grid>
      <Grid xs={12} md={6} >
        <Typography>
          Read our learning guide and start at Level 1, unless your child has played before. To start playing, you need to first register as an independent student. This will ensure that the level progress is saved.
        </Typography>
        <Typography>
          If you would like to keep updated on our products and receive emails about Code for Life, please sign up to our updates.
        </Typography>
      </Grid>
    </Grid>
    <Grid xs={12} display='flex' justifyContent='flex-end'>
      <Button href={paths.register}>
        Register now
      </Button>
    </Grid>
  </Grid>
);

export default AboutRR;
