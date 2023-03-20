import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';

const ForChildren: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography>
          test
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ForChildren;
