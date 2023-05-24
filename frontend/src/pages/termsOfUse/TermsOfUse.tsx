import React from 'react';

import BasePage from '../../pages/BasePage';
import PageTabBar from '../../components/PageTabBar';
import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const TermsOfUse: React.FC = () => {
  return (
    <BasePage>
      <PageTabBar
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
    </BasePage>
  );
};

export default TermsOfUse;
