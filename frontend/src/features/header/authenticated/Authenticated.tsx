import React from 'react';
import {
  Typography,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon
} from '@mui/icons-material';

import { MenuComponents } from '../menu/Menu';
import MenuButton from '../menu/MenuButton';
import LoginSelect, { LoginSelectProps } from '../LoginSelect';

interface SummaryProps {
  userType: string;
  dashboardHref: string;
  children: React.ReactNode;
  menuItemsProps: LoginSelectProps['menuItemsProps'];
}

const Summary: React.FC<SummaryProps> = ({
  userType,
  dashboardHref,
  children,
  menuItemsProps
}) => {
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));

  // TODO: get from API.
  const userName = 'John Doe';

  return <>
    <Typography
      variant={upLg ? 'h4' : 'h5'}
      marginBottom={0}
    >
      {userType}
    </Typography>
    <Link
      className='no-decor'
      href={dashboardHref}
    >
      Dashboard
    </Link>
    {children}
    <LoginSelect
      width='220px'
      text={userName}
      IconComponent={PersonOutlineOutlinedIcon}
      menuItemsProps={[
        {
          children: 'Log out',
          icon: <LogoutOutlinedIcon />
        },
        ...menuItemsProps
      ]}
      sx={{ marginLeft: 'auto' }}
    />
  </>;
};

interface DetailsProps {
  children: React.ReactNode;
}

const Details: React.FC<DetailsProps> = ({
  children
}) => {
  const theme = useTheme();

  // TODO: get from API.
  const userName = 'John Doe';

  return <>
    <Typography
      variant='h1'
      textAlign='center'
      mb={0}
      padding='12px'
      style={{ backgroundColor: theme.palette.info.main }}
      textOverflow='ellipsis'
      overflow='hidden'
      whiteSpace='break-spaces'
    >
      {userName}
    </Typography>
    {children}
    <MenuButton onClick={() => { alert('TODO: logout user'); }}>
      Logout
    </MenuButton>
  </>;
};

const Authenticated: MenuComponents<
  SummaryProps,
  DetailsProps
> = {
  Summary,
  Details
};

export default Authenticated;
