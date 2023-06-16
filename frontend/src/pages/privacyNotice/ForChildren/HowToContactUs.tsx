import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

const HowToContactUs: React.FC = () => <>
  <Typography>
    Please contact our Data Protection Officer at&nbsp;
    <Link href='mailto:individualrights@ocado.com'>
      individualrights@ocado.com
    </Link>
    &nbsp;if you have any questions about this Privacy Notice or the information we hold about you.
  </Typography>
</>;

export default HowToContactUs;
