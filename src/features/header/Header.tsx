import React from 'react';
import {
  IconButton,
  Link,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { ElevatedAppBar, Image } from 'codeforlife/lib/esm/components';

import CflLogo from 'images/cfl_logo.png';
import OgLogo from 'images/ocado_group.svg';

import LoginSelect from './LoginSelect';
import MenuDrawer from './MenuDrawer';

const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const display = { xs: 'none', sm: 'inline' };
  const mr = { sm: 1, md: 4 };

  return (
    <>
      <ElevatedAppBar props={{ color: 'white' }}>
        <Image
          alt='Code for Life'
          src={CflLogo}
          boxProps={{ maxWidth: '60px' }}
        />
        <Image
          alt='Ocado Group'
          src={OgLogo}
          boxProps={{
            maxWidth: '100px',
            mx: { xs: 'auto', ...mr }
          }}
        />
        <Link sx={{ display, mr }} >
          Teachers
        </Link>
        <Link sx={{ display, mr }} color='secondary'>
          Students
        </Link>
        <Button sx={{ display, mr, ml: 'auto' }}>
          Register
        </Button>
        <LoginSelect sx={{ display, width: '200px' }} />
        <IconButton
          onClick={() => { setMenuIsOpen(true); }}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </ElevatedAppBar>
      <MenuDrawer isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
    </>
  );
};

export default Header;
