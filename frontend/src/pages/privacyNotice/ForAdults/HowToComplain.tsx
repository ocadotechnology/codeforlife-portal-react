import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

const HowToComplain: React.FC = () => (
  <>
    <Typography>
      We hope that we or our Data Protection Officer can resolve any query or concern you raise about this Privacy Notice or how we use your information.
    </Typography>
    <Typography mb={0}>
      Alternatively, you also have the right to lodge a complaint with a data protection authority, in particular in the UK and/or the and/or the European Union (or European Economic Area) country where you work, normally live or where any alleged infringement of data protection laws occurred. The data protection authority in the UK is the Information Commissioner who may be contacted at&nbsp;
      <Link href='https://ico.org.uk/concerns/' target='_blank'>
        https://ico.org.uk/concerns/
      </Link>
      &nbsp;or telephone: +44 303 123 1113.
    </Typography>
  </>
);

export default HowToComplain;
