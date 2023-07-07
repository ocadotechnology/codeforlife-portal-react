import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const TermsOfUse: React.FC = () => {
  return (
    <Page.Container>
      <Page.TabBar
        header='Terms of use'
        originalPath='/terms-of-use/:tab'
        tabs={[
          {
            label: 'Terms of use',
            children: <ForAdults />,
            path: 'terms-of-use'
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

export default TermsOfUse;
