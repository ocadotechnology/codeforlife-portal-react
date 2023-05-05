import { Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

const DashboardBanner: React.FC = (): JSX.Element => {
  const theme = useTheme();

  const BannerStyle = {
    background: theme.palette.primary.main
  };

  const getUserFirstName = (): string => {
    // TODO: make a method to get the user from the backend
    return 'John';
  };

  return (
    <Grid py={10} sx={BannerStyle} container justifyContent="center">
      <Grid
        item
        direction="row"
        justifyContent="center"
        color={theme.palette.primary.contrastText}
        xs="auto"
      >
        <Typography variant="h1">Welcome back, {getUserFirstName()}</Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardBanner;
