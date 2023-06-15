import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

const HowToComplain: React.FC = () => <>
  <Typography>
    If you have a complaint about how we’ve used your personal information, you can write to our Data Protection Officer at&nbsp;
    <Link href='mailto:individualrights@ocado.com'>
      individualrights@ocado.com
    </Link>
    .
  </Typography>
  <Typography>
    You also have the right to complain to the Information Commissioner’s Office (the ICO). The ICO’s role is to make sure organisations like Ocado use your personal information fairly and keep it safe. You may contact the ICO by telephoning them on the number below or by visiting their website.
  </Typography>
  <Typography>
    Telephone: 0303 123 1113
  </Typography>
  <Typography>
    Website:&nbsp;
    <Link href='https://ico.org.uk/concerns'>
      https://ico.org.uk/concerns
    </Link>
  </Typography>
</>;

export default HowToComplain;
