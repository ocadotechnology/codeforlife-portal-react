import React from 'react';
import {
  AppBar,
  IconButton,
  useScrollTrigger,
  Toolbar,
  Link,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import CflLogo from 'images/cfl_logo.png';
import OgLogo from 'images/ocado_group.svg';

const ElevationScroll: React.FC<{
  children: React.ReactElement
}> = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const Header: React.FC = () => {
  return (
    <ElevationScroll>
      <AppBar color='white'>
        <Toolbar>
          <IconButton sx={{ display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Image
            alt='Code for Life'
            src={CflLogo}
            boxProps={{ maxWidth: '60px' }}
          />
          <Image
            alt='Code for Life'
            src={OgLogo}
            boxProps={{ maxWidth: '100px' }}
          />
          <Link>
            Teachers
          </Link>
          <Link>
            Students
          </Link>
          <Button>
            Register
          </Button>
          <Select label='Log in'>
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
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
