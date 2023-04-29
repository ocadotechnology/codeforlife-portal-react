import React from 'react';
import {
  Select,
  SxProps,
  MenuItem,
  MenuItemProps,
  useTheme
} from '@mui/material';

import { insertDividerBetweenElements } from 'codeforlife/lib/esm/helpers';

const LoginSelect: React.FC<{
  sx: SxProps
}> = ({ sx }) => {
  const theme = useTheme();

  const paletteColor = 'tertiary';
  const borderColor = theme.palette[paletteColor].main;
  const menuItems: Array<MenuItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>> = [
    { children: 'Student', href: '' },
    { children: 'Teacher', href: '' },
    { children: 'Independent', href: '' }
  ];

  return (
    <Select
      SelectDisplayProps={{ style: { width: 'auto' } }}
      displayEmpty
      value=''
      color={paletteColor}
      className='Mui-focused'
      inputProps={{
        MenuProps: {
          sx: { mt: 0.5 },
          MenuListProps: {
            sx: {
              border: `2px solid ${borderColor}`
            }
          }
        }
      }}
      sx={sx}
    >
      <MenuItem value='' sx={{ display: 'none' }}>
        Log in
      </MenuItem>
      {insertDividerBetweenElements({
        elements: menuItems.map((menuItem, index) => (
          <MenuItem key={index} {...menuItem} />
        )),
        dividerProps: { sx: { borderColor } }
      })}
    </Select>
  );
};

export default LoginSelect;
