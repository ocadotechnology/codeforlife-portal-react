import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { getUser } from './dummyMethods';

const DashboardBanner: React.FC = (): JSX.Element => {
  const theme = useTheme();

  const BannerStyle = {
    background: theme.palette.primary.main
  };
  const { firstName, lastName } = getUser();

  return (
    <Grid py={10} sx={BannerStyle} container justifyContent="center">
      <Grid
        item
        direction="row"
        justifyContent="center"
        color={theme.palette.primary.contrastText}
        xs="auto"
      >
        <Typography variant="h2">
          Welcome back, {firstName} {lastName}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardBanner;
