import React from 'react';
import {
  Select,
  MenuItem,
  Divider,
  useTheme
} from '@mui/material';

const LoginSelect: React.FC = () => {
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
      displayEmpty
      value=''
      sx={{ width: '200px' }}
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
