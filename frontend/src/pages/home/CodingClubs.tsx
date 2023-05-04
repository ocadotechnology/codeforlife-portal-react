import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  Button
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';

const CodingClubs: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography variant='h3' textAlign='center'>
          Want to run a Code for Life coding club?
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
          Take a look at our two club packs that we have put together using our Rapid Router resources. These are fast-paced, session based clubs that can be run by anyone keen to help people learn to code. There are guides and resource links with printable cerificates for those that complete the course.
        </Typography>
      </Grid>
      <Grid xs={12} display='flex' justifyContent='end'>
        <Button
          href={paths.codingClubs}
          endIcon={<ChevronRightIcon />}
        >
          Find out more
        </Button>
      </Grid>
    </Grid>
  );
};

export default CodingClubs;
