import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button
} from '@mui/material';

import { paths } from '../../app/router';

const CodingClubs: React.FC = () => {
  return (
    <Grid container spacing={2} padding={3}>
      <Grid xs={12}>
        <Typography variant='h3' textAlign='center'>
          Want to run a Code for Life coding club?
        </Typography>
      </Grid>
      <Grid xs={12} md={8} mdOffset={2}>
        <Typography fontSize={18}>
          Take a look at our two club packs that we have put together using our Rapid Router resources. These are fast-paced, session based clubs that can be run by anyone keen to help people learn to code. There are guides and resource links with printable cerificates for those that complete the course.
        </Typography>
      </Grid>
      <Grid xs={12} display='flex' justifyContent='end'>
        <Button style={{ marginRight: 20 }} href={paths.codingClubs}>
          Find out more &gt;
        </Button>
      </Grid>
    </Grid>
  );
};

export default CodingClubs;
