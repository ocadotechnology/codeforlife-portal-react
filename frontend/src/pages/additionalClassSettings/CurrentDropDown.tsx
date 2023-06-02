import React from 'react';
import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';

const CurrentDropdown: React.FC<any> = ({ onChange }) => {
  const currentDropdownOptions = [
    "Don't change my current setting",
    "Don't allow external requests to this class",
    'Allow external requests to this class for the next hour',
    'Allow external requests to this class for the next 4 hours',
    'Allow external requests to this class for the next 8 hours',
    'Allow external requests to this class for the next 12 hours',
    'Allow external requests to this class for the next 16 hours',
    'Allow external requests to this class for the next 20 hours',
    'Allow external requests to this class for the next 24 hours',
    'Allow external requests to this class for the next 2 days',
    'Allow external requests to this class for the next 3 days',
    'Allow external requests to this class for the next 4 days',
    'Always allow external requests to this class (not recommended)'
  ];

  const [dropdownValue, setDropdownValue] = React.useState<string>(
    currentDropdownOptions[0]
  );

  return (
    <FormControl fullWidth>
      <Select
        size="small"
        labelId="lel"
        id="lelSelect"
        name="classSettingOptions"
        value={dropdownValue}
        onChange={(e) => {
          setDropdownValue(e.target.value);
          onChange(e);
        }}
      >
        {currentDropdownOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Choose your setting</FormHelperText>
    </FormControl>
  );
};

export default CurrentDropdown;
