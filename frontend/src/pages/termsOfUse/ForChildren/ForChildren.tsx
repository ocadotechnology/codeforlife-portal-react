import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';

import Misuse from './Misuse';
import OtherLimitsOfUse from './OtherLimitsOfUse';
import Alerting from './Alerting';
import IP from './IP';
import OurResponsibilities from './OurResponsibilities';
import TableOfContentsChildren from './TableOfContentsChildren';
import ChildrenIntro from './ChildrenIntro';

const ForChildren: React.FC = () => {
  return (
    <Stack>
      <Typography
        variant='h4'
        textAlign='center'
        marginTop={2}
      >
        Terms of Use
      </Typography>
      <ChildrenIntro />
      <TableOfContentsChildren contents={[
        {
          header: 'Misuse of Code for Life site',
          element: <Misuse />
        },
        {
          header: 'Other limits of use',
          element: <OtherLimitsOfUse />
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
          header: 'Our Responsibilities',
          element: <OurResponsibilities />
        }
      ]} />
    </Stack>
  );
};

export default ForChildren;
