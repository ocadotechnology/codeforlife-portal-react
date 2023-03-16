import React, { useState } from 'react';
import {
  Unstable_Grid2 as Grid2,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Tooltip,
  SvgIcon,
  Button,
  Select,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPages } from './appBarSlice';
import { Image } from 'codeforlife/lib/esm/components';

import CflIcon from 'images/cfl_logo.png';
import { ReactComponent as OcadoGroupIcon } from 'images/ocado_group.svg';

export default function StefanAppBar(): JSX.Element {
  const navigate = useNavigate();
  const pages = useAppSelector(selectPages);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Grid2
      container
      padding={1}
      alignItems='center'
      sx={{ maxHeight: '5%' }}
    >
      <Image src={CflIcon} alt='Code for Life logo' />

      {/* <Box
        component={Grid2}
        xs={1}
        display={{ md: 'none' }}
      >
        <IconButton onClick={(event) => { setMenuAnchorEl(event.currentTarget); }} >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={() => { setMenuAnchorEl(null); }}
          keepMounted
          sx={{ display: { md: 'none' } }}
        >
          {pages.map((page) =>
            <MenuItem key={page.name} onClick={() => { navigate(page.url); }}>
              <Typography>
                {page.name}
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Box> */}

      {/* <Grid2
        xs={4}
        xsOffset={2}
        mdOffset={0}
        container
        spacing={1}
      >
        <Grid2 xs={6}>
          <Image src={CflIcon} alt='Code for Life logo' />
        </Grid2>
        <Grid2 xs={6}>
          <OcadoGroupIcon />
        </Grid2>
      </Grid2>

      <Grid2 xs={2}>
        <Button>
          Register
        </Button>
      </Grid2>

      <Grid2 xs={1.5}>
        <FormControl fullWidth>
          <InputLabel id='login-label'>Log in</InputLabel>
          <Select id='login' label='Log in'>
            <MenuItem value={10}>Student</MenuItem>
            <MenuItem value={20}>Teacher</MenuItem>
            <MenuItem value={30}>Independent</MenuItem>
          </Select>
        </FormControl>
      </Grid2> */}
    </Grid2>
  );
}
