import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import Header from 'features/header/Header';
import Footer from 'features/footer/Footer';

import TargetAudience from './TargetAudience';
import AboutUs from './AboutUs';
import Quotes from './Quotes';
import CodingClubs from './CodingClubs';

const Dashboard: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Header />
      </Grid>
      <Grid xs={12} md={6}>
        <TargetAudience />
      </Grid>
      <Grid xs={12} md={6}>
        <TargetAudience />
      </Grid>
      <Grid xs={12}>
        <AboutUs />
      </Grid>
      <Grid xs={12}>
        <Quotes />
      </Grid>
      <Grid xs={12}>
        <CodingClubs />
      </Grid>
      <Grid xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
