import React from 'react';
import {
  Grid2Props,
  Unstable_Grid2 as Grid
} from '@mui/material';

const PageSection: React.FC<{
  children: React.ReactNode,
  containerProps?: Grid2Props
}> = ({ children, containerProps = {} }) => {
  return <>
    <Grid container xs={12} px={{ xs: 5, md: 15, lg: 30 }} py={3} spacing={1} {...containerProps}>
      {children}
    </Grid>
  </>;
};

export default PageSection;
