import React from 'react';

import {
  CheckboxField
} from 'codeforlife/lib/esm/components/form';

const SeeClassmatesProgressField: React.FC = () => {
  return (
    <CheckboxField
      name='seeClassmates'
      formControlLabelProps={{
        label: 'Allow students to see their classmates\' progress?'
      }}
    />
  );
};

export default SeeClassmatesProgressField;
