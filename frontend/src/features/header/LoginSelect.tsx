import React from 'react';
import {
  Select,
  SxProps,
  MenuItem,
  useTheme,
  Link,
  LinkProps
} from '@mui/material';

import { insertDividerBetweenElements } from 'codeforlife/lib/esm/helpers';
import { paths } from 'app/router';

const LoginSelect: React.FC<{
  sx: SxProps;
}> = ({ sx }) => {
  const theme = useTheme();

  const paletteColor = 'tertiary';
  const borderColor = theme.palette[paletteColor].main;
  const menuItems: Array<
    LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
  > = [
    { children: 'Student', href: paths.login.accessCode },
    { children: 'Teacher', href: paths.login.teacher },
    { children: 'Independent', href: paths.login.independent }
  ];
  return (
    <Select
      SelectDisplayProps={{ style: { width: 'auto' } }}
      displayEmpty
      value=""
      color={paletteColor}
      className="Mui-focused"
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
      <MenuItem value="" sx={{ display: 'none' }}>
        Log in
      </MenuItem>
      {insertDividerBetweenElements({
        elements: menuItems.map((menuItem, index) => (
          <Link
            marginLeft="auto"
            color={theme.palette.common.black}
            key={index}
            {...menuItem}
          /> // this needs to be a clickable element for the elements to redirect to the correct page
        )),
        dividerProps: { sx: { borderColor } }
      })}
    </Select>
  );
};

export default LoginSelect;
