import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography
} from '@mui/material';
import TableOfContents from 'components/TableOfContents';
import Introduction from './Introduction';
import RegistrationAndMembership from './RegistrationAndMembership';
import Misuse from './Misuse';
import Prohibitions from './Prohibitions';
import Alerting from './Alerting';
import IP from './IP';
import Liability from './Liability';
import Misc from './Misc';

const ForAdults: React.FC = () => {
  return (
    <Grid container marginTop={2}>
      <Grid xs={12}>
        <Typography variant='h4' textAlign='center'>
          Terms of Use
        </Typography>
      </Grid>
      <Grid xs={12}>
        <TableOfContents contents={[
          {
            header: 'Introduction',
            element: <Introduction />
          },
          {
            header: 'Registration and Types of Membership',
            element: <RegistrationAndMembership />
          },
          {
            header: 'Misuse of Code for Life site',
            element: <Misuse />
          },
          {
            header: 'Prohibitions',
            element: <Prohibitions />
          },
          {
            header: 'Alerting Code for Life',
            element: <Alerting />
          },
          {
            header: 'Intellectual Property',
            element: <IP />
          },
          {
            header: 'Our Liability',
            element: <Liability />
          },
          {
            header: 'Miscellaneous',
            element: <Misc />
          }
        ]} />
      </Grid>
    </Grid>
  );
};

export default ForAdults;
