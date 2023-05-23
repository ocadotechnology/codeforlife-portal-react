import React from 'react';
import {
  Stack,
  Link,
  Typography
} from '@mui/material';

const Alerting: React.FC = () => {
  // TODO: setup contact us link.
  return (
    <Stack>
      <Typography>
        If you see anything on the Code for Life portal which appears to infringe any part of the Terms & Conditions, then please inform us via the <Link href='' color='inherit' underline='always'>Contact Us</Link> section of this site.
      </Typography>
      <Typography>
        We do not endorse or take responsibility for the content of any third party sites that link to or from Code for Life.
      </Typography>
    </Stack>
  );
};

export default Alerting;
