import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

const InfoSecurity: React.FC = () => (
  <>
    <Typography>
      We have security measures in place to prevent personal information from being accidentally lost, or used or accessed in an unauthorised way. We limit access to your personal information to those persons who have a genuine business need to know it and we require them to keep it confidential.
    </Typography>
    <Typography>
      We enable Teachers to use two-factor authentication to further reinforce the security of their accounts and we encourage them to do that. You can find more details&nbsp;
      <Link href='https://www.getsafeonline.org/personal/articles/passwords/' target='_blank'>
        here
      </Link>
      .
    </Typography>
    <Typography mb={0}>
      If you want detailed information from Get Safe Online on how to protect your information and your computers and devices against fraud, identity theft, viruses and many other online problems, please visit&nbsp;
      <Link href='https://www.getsafeonline.org/' target='_blank'>
        www.getsafeonline.org
      </Link>
      . Get Safe Online is supported by HM Government and leading businesses.
    </Typography>
  </>
);

export default InfoSecurity;
