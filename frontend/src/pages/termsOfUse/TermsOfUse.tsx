import React from 'react';

import Page from 'codeforlife/lib/esm/components/page';

import ForAdults from './ForAdults/ForAdults';
import ForChildren from './ForChildren/ForChildren';

const TermsOfUse: React.FC = () => {
  return (
    <Page.Container>
      <Page.TabBar
        header='Terms of use'
        tabs={[
          {
            label: 'Terms of use',
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

export default TermsOfUse;
