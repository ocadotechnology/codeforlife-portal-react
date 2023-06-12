import React from 'react';
import {
  Stack,
  Typography
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TableOfContents from '../../../components/TableOfContents';
import Misuse from './Misuse';
import OtherLimitsOfUse from './OtherLimitsOfUse';
import Alerting from './Alerting';
import IP from './IP';
import OurResponsibilities from './OurResponsibilities';
import ChildrenIntro from './ChildrenIntro';

const ForChildren: React.FC = () => {
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
        <ChildrenIntro />
        <TableOfContents contents={[
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
    </Page.Section>
  );
};

export default ForChildren;
