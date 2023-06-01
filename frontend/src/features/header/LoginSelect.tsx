import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SxProps,
  MenuItem,
  MenuItemProps,
  useTheme
} from '@mui/material';

import { insertDividerBetweenElements } from 'codeforlife/lib/esm/helpers';
import { paths } from '../../app/router';

const LoginSelect: React.FC<{
  sx: SxProps;
}> = ({ sx }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const paletteColor = 'tertiary';
  const borderColor = theme.palette[paletteColor].main;

  function onClick(navigateTo: string): () => void {
    return () => {
      setOpen(false);
      navigate(navigateTo);
    };
  }

  const menuItems: Array<(
    MenuItemProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
  )> =
    [
      { children: 'Student', onClick: onClick(paths.login.student) },
      { children: 'Teacher', onClick: onClick(paths.login.teacher._) },
      { children: 'Independent', onClick: onClick(paths.login.independent) }
    ];

  return (
    <Select
      open={open}
      onOpen={() => { setOpen(true); }}
      onClose={() => { setOpen(false); }}
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
          <MenuItem key={index} {...menuItem} />
        )),
        dividerProps: { sx: { borderColor } }
      })}
    </Select>
  );
};

export default LoginSelect;
