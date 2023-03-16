import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Box,
} from '@mui/material';

// import AppBar from 'features/appBar/AppBar';
// import StefanAppBar from 'features/appBar/StefanAppBar';
import Footer from 'features/footer/Footer';

export default function Dashboard(): JSX.Element {
  return (
    <Grid container>
      <Grid xs={12}>
        <Box sx={{ bgcolor: 'red' }}>.</Box>
      </Grid>
      <Grid xs={12} md={6}>
        <Box sx={{ bgcolor: 'pink' }}>.</Box>
      </Grid>
      <Grid xs={12} md={6}>
        <Box sx={{ bgcolor: 'blue' }}>.</Box>
      </Grid>
      <Grid xs={12}>
        <Box sx={{ bgcolor: 'green' }}>.</Box>
      </Grid>
      <Grid xs={12}>
        <Box sx={{ bgcolor: 'orange' }}>.</Box>
      </Grid>
      <Grid xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
