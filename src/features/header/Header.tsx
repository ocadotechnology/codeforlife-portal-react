import React from 'react';
import {
  IconButton,
  Link,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { ElevatedAppBar, Image } from 'codeforlife/lib/esm/components';

import CflLogo from 'images/cfl_logo.png';
import OgLogo from 'images/ocado_group.svg';

import MenuDrawer from './MenuDrawer';

const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const display = { xs: 'none', sm: 'inline' };

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
            mx: { xs: 'auto', sm: 0 }
          }}
        />
        <Link sx={{ display: display }}>
          Teachers
        </Link>
        <Link sx={{ display: display }}>
          Students
        </Link>
        <Button sx={{ display: display }}>
          Register
        </Button>
        <FormControl sx={{ display: display, width: '200px' }}>
          <InputLabel>Log in</InputLabel>
          <Select>
            <MenuItem>
              Student
            </MenuItem>
            <MenuItem>
              Teacher
            </MenuItem>
            <MenuItem>
              Independent
            </MenuItem>
          </Select>
        </FormControl>
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
