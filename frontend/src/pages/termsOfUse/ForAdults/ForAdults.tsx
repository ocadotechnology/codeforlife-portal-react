import React from 'react';
import {
  Typography,
  Stack
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TableOfContents from '../../../components/TableOfContents';
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
    <Page.Section>
      <Stack>
        <Typography
          variant='h4'
          textAlign='center'
          marginTop={2}
        >
          Terms of Use
        </Typography>
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
      </Stack>
    </Page.Section>
  );
};

export default ForAdults;
