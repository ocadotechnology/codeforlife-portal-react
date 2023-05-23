import React from 'react';

import BasePage from '../../pages/BasePage';
import PageTabBar from '../../components/PageTabBar';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const PrivacyNotice: React.FC = () => {
  return (
    <BasePage>
      <PageTabBar
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
    </BasePage>
  );
};

export default PrivacyNotice;
