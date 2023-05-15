import React from 'react';
import {
  Unstable_Grid2 as Grid
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
    <Grid container marginTop={2}>
      <ChildrenIntro />

      <Grid xs={12}>
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
      </Grid>
    </Grid >
  );
};

export default ForChildren;
