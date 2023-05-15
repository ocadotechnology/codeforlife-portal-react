import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Link,
  Typography
} from '@mui/material';

const Alerting: React.FC = () => {
  return (
    <Grid>
      <Typography>
        If you see anything on the Code for Life portal which appears to infringe any part of the Terms & Conditions, then please inform us via the <Link href='' color='inherit' underline='always'>Contact Us</Link> section of this site.
      </Typography>
      <Typography>
        We do not endorse or take responsibility for the content of any third party sites that link to or from Code for Life.
      </Typography>
    </Grid>
  );
};

export default Alerting;
