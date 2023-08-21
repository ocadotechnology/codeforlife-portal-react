import React from 'react';
import { overwrite, getNames } from 'country-list';

import {
  AutocompleteField
} from 'codeforlife/lib/esm/components/form';

const SchoolCountryField: React.FC = () => {
  overwrite([{
    code: 'TW',
    name: 'Taiwan'
  }]);

  return (
    <AutocompleteField
      options={getNames()}
      textFieldProps={{
        required: true,
        name: 'country',
        helperText: 'Country',
        placeholder: '(select country)'
      }}
    />
  );
};

export default SchoolCountryField;
