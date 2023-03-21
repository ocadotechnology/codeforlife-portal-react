import React from 'react';
import {
  Select,
  SxProps,
  MenuItem,
  Divider,
  useTheme
} from '@mui/material';

const LoginSelect: React.FC<{
  sx: SxProps
}> = ({ sx }) => {
  const theme = useTheme();

  const paletteColor = 'tertiary';
  const borderColor = theme.palette[paletteColor].main;
  const menuItems = [
    ['Student', ''],
    ['Teacher', ''],
    ['Independent', '']
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
      {menuItems.map(([text, link], index) => (
        <>
          <MenuItem>{text}</MenuItem>
          {index !== menuItems.length - 1
            ? <Divider sx={{ borderColor }} />
            : null
          }
        </>
      ))}
    </Select>
  );
};

export default LoginSelect;
