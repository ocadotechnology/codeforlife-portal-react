import React from 'react';
import {
  Unstable_Grid2 as Grid
} from '@mui/material';

import BasePage from '../../pages/BasePage';
import TabBar from 'components/TabBar';
import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const TermsOfUse: React.FC = () => {
  return (
    <BasePage>
      <Grid xs={12}>
        <TabBar
          title='Terms of use'
          tabs={[
            {
              label: 'Terms of use',
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

export default TermsOfUse;
