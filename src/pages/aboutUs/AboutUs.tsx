import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import Header from 'features/header/Header';
import Footer from 'features/footer/Footer';

const AboutUs: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Header />
      </Grid>
      <Grid xs={12}>
        TODO
      </Grid>
      <Grid xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default AboutUs;
