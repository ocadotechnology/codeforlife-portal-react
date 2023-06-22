import React from 'react';
import {
  Button,
  ButtonProps
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

export interface MenuButtonProps extends ButtonProps { }

const MenuButton: React.FC<MenuButtonProps> = (props) => (
  <Button
    {...props}
    variant='text'
    endIcon={<ChevronRightIcon />}
  />
);

export default MenuButton;
