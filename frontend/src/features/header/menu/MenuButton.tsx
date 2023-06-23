import React from 'react';
import {
  Button,
  ButtonProps
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

export interface MenuButtonProps extends ButtonProps {
  spacing?: number;
  bgcolor?: {
    main: string;
    contrastText: string;
  };
}

const MenuButton: React.FC<MenuButtonProps> = ({
  spacing = 1,
  bgcolor,
  sx,
  ...otherButtonProps
}) => (
  <Button
    {...otherButtonProps}
    variant='text'
    endIcon={<ChevronRightIcon />}
    sx={{
      ...sx,
      ...(bgcolor !== undefined && {
        bgcolor: bgcolor.main,
        ':hover': {
          bgcolor: bgcolor.main
        },
        color: `${bgcolor.contrastText} !important`
      }),
      paddingTop: '24px !important',
      paddingBottom: '24px !important',
      paddingRight: '12px !important',
      paddingLeft: `${12 * spacing}px !important`
    }}
  />
);

export default MenuButton;
