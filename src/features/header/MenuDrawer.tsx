import React from 'react';
import {
  SwipeableDrawer,
  Button
} from '@mui/material';

const MenuDrawer: React.FC<{
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
}> = ({ isOpen, setIsOpen }) => (
  <SwipeableDrawer
    anchor='right'
    open={isOpen}
    onClose={() => { setIsOpen(false); }}
    onOpen={() => { setIsOpen(true); }}
  >
    <Button>
      Register now
    </Button>
  </SwipeableDrawer>
);

export default MenuDrawer;
