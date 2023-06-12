import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const PrivacyNotice: React.FC = () => {
  return (
    <Page.Container>
      <Page.TabBar
        header='Privacy notice'
        tabs={[
          {
            label: 'Privacy notice',
            children: <ForAdults />
          },
          {
            label: 'Child-friendly',
            children: <ForChildren />
          }
        ]}
      />
    </Page.Container>
  );
};

export default PrivacyNotice;
