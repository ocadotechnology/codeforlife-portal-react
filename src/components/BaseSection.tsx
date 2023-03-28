import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Grid2Props
} from '@mui/material';

type GridElement = React.ReactElement<typeof Grid>;

export interface BaseSectionProps {
  children: GridElement | GridElement[],
  containerProps?: Grid2Props
};

export const BaseSection: React.FC<BaseSectionProps> = ({ children, containerProps = {} }) => {
  return (
    <Grid container xs={12} p={0} spacing={0} {...containerProps}>
      <Grid xs={0} md={1} lg={2} />
      <Grid xs p={3}>
        {children}
      </Grid>
      <Grid xs={0} md={1} lg={2} />
    </Grid >
  );
};
