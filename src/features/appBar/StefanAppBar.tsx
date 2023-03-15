import React, { useState } from 'react';
import {
  Unstable_Grid2 as Grid2,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Stack,
  Avatar,
  Tooltip,
  SvgIcon
} from '@mui/material';
import {
  Adb as AdbIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectPages } from './appBarSlice';
import Image from 'components/image/Image';

import CflIcon from 'images/cfl_logo.png';
import OcadoGroupIcon from 'images/ocado_group.svg';

export default function StefanAppBar(): JSX.Element {
  const navigate = useNavigate();
  const pages = useAppSelector(selectPages);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Grid2
      container
      padding={1}
      alignItems='center'
    >
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

      <Grid2
        xs={2}
        xsOffset={4}
        mdOffset={0}
        container
        spacing={1}
      >
        <Grid2>
          <Image src={CflIcon} alt='Code for Life logo' />
        </Grid2>
        <Grid2>
          <SvgIcon component={OcadoGroupIcon} />
        </Grid2>
      </Grid2>

      <Grid2 xs={1} xsOffset='auto'>
        <Tooltip title='Open settings'>
          <IconButton>
            <Avatar />
          </IconButton>
        </Tooltip>
      </Grid2>
    </Grid2>
  );
}
