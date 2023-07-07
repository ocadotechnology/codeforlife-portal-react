import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';

const Alerting: React.FC = () => {
  return (
    <Stack>
      <Typography>
        If you see anything on the Code for Life portal which you think breaks the rules in our Terms of Use, then please let us know by using the <mark>Contact Us</mark> section of the site.
      </Typography>
      <Typography mb={0}>
        The Code for Life site has links to websites that are run by other organisations, and other organisation websites will sometimes have links to our site. We have no control over these other websites and so are not responsible for their contents.
      </Typography>
    </Stack>
  );
};

export default Alerting;
