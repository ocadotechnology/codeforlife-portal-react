import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const PrivacyNotice: React.FC = () => {
  return (
    <Page.Container>
      <Page.TabBar
        header='Privacy notice'
        originalPath='/privacy-notice/:tab'
        tabs={[
          {
            label: 'Privacy notice',
            children: <ForAdults />,
            path: 'privacy-notice'
          },
          {
            label: 'Child-friendly',
            children: <ForChildren />,
            path: 'child-friendly'
          }
        ]}
      />
    </Page.Container>
  );
};

export default PrivacyNotice;
