import React from 'react';
import {
  IconButton,
  Link,
  LinkProps,
  Button,
  Box,
  Stack,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import CflLogo from '../../images/cfl_logo.png';
import OgLogo from '../../images/ocado_group.svg';
import LoginSelect from './LoginSelect';
import MenuDrawer from './MenuDrawer';

const Header: React.FC = () => {
  const theme = useTheme();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const extraMargin = '10px';
  const linkProps: LinkProps = {
    display: { xs: 'none', md: 'inline' },
    color: '#383b3b',
    variant: useMediaQuery(theme.breakpoints.up('lg')) ? 'h4' : 'h5',
    className: 'no-decor',
    marginLeft: extraMargin,
    marginBottom: '0px !important'
  };

  return <>
    <Box style={{
      width: '100%',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 2
    }}>
      <Container sx={{
        height: { xs: '80px', md: '100px' },
        paddingY: '15px'
      }}>
        <Stack
          direction='row'
          alignItems='center'
          height='100%'
          width='100%'
          gap={3}
        >
          <Image
            alt='Code for Life'
            src={CflLogo}
            maxWidth={{ xs: '65px', md: '80px' }}
            href={paths._}
            marginRight={{ xs: 0, md: extraMargin }}
          />
          <Image
            alt='Ocado Group'
            src={OgLogo}
            maxWidth={{ xs: '115px', md: '150px' }}
            mx={{ xs: 'auto', md: 0 }}
            href={process.env.REACT_APP_OCADO_GROUP_HREF}
            hrefInNewTab
          />
          <Link {...linkProps} href={paths.teacher._}>
            Teachers
          </Link>
          <Link {...linkProps} href={paths.student._}>
            Students
          </Link>
          <Button
            sx={{
              display: { xs: 'none', md: 'flex' },
              ml: 'auto'
            }}
            href={paths.register._}
          >
            Register
          </Button>
          <LoginSelect />
          <IconButton
            onClick={() => { setMenuIsOpen(true); }}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>
    </Box>
    <MenuDrawer isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />
  </>;
};

export default Header;
