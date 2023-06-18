import React from 'react';
import {
  IconButton,
  Box,
  Stack,
  Container
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import CflLogo from '../../images/cfl_logo.png';
import OgLogo from '../../images/ocado_group.svg';
import MenuDrawer from './MenuDrawer';
import Unauthenticated from './Unauthenticated';
import Teacher from './Teacher';
import Student from './Student';
import Independent from './Independent';

const Header: React.FC = () => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  // TODO: check if the use is logged in and account type.
  // This is temporary for testing purposes.
  let children: React.ReactNode;
  function hrefIncludes(href: string): boolean {
    return window.location.href.includes(href);
  }
  if (hrefIncludes(paths.teacher.dashboard._)) {
    children = <Teacher />;
  } else if (hrefIncludes(paths.student.dashboard.dependent._)) {
    children = <Student />;
  } else if (hrefIncludes(paths.student.dashboard.independent._)) {
    children = <Independent />;
  } else {
    children = <Unauthenticated />;
  }

  return <>
    <Box style={{
      width: '100%',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 2
    }}>
      <Container
        maxWidth='xl'
        sx={{
          height: { xs: '80px', lg: '100px' },
          paddingY: '15px'
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          height='100%'
          width='100%'
          gap={5}
        >
          <Image
            alt='Code for Life'
            src={CflLogo}
            maxWidth={{ xs: '65px', lg: '80px' }}
            href={paths._}
            marginRight={{ xs: 0, lg: '10px' }}
          />
          <Image
            alt='Ocado Group'
            src={OgLogo}
            maxWidth={{ xs: '115px', lg: '150px' }}
            mx={{ xs: 'auto', lg: 0 }}
            href={process.env.REACT_APP_OCADO_GROUP_HREF}
            hrefInNewTab
          />
          <Stack
            direction='row'
            alignItems='center'
            height='100%'
            width='100%'
            gap={3}
            display={{ xs: 'none', lg: 'flex' }}
          >
            {children}
          </Stack>
          <IconButton
            onClick={() => { setMenuIsOpen(true); }}
            sx={{ display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
    <MenuDrawer
      isOpen={menuIsOpen}
      setIsOpen={setMenuIsOpen}
    />
  </>;
};

export default Header;
