import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import BasePage from 'pages/BasePage';
import TabBar from 'components/TabBar';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const PrivacyNotice: React.FC = () => {
  return (
    <BasePage>
      <Grid xs={12}>
        <TabBar
          title='Privacy notice'
          tabs={[
            {
              label: 'Privacy notice',
              element: <ForAdults />
            },
            {
              label: 'Child-friendly',
              element: <ForChildren />
            }
          ]}
        />
      </Grid>
    </BasePage>
  );
};

export default PrivacyNotice;
