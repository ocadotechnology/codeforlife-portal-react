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

import {
  SummaryLoginSelect,
  SummaryLoginSelectProps
} from '../summary';
import {
  DetailsButton
} from '../details';

interface AuthenticatedSummaryProps {
  userType: string;
  dashboardHref: string;
  children: React.ReactNode;
  menuItemsProps: SummaryLoginSelectProps['menuItemsProps'];
}

export const AuthenticatedSummary: React.FC<AuthenticatedSummaryProps> = ({
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
    <SummaryLoginSelect
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

interface AuthenticatedDetailsProps {
  children: React.ReactNode;
}

export const AuthenticatedDetails: React.FC<AuthenticatedDetailsProps> = ({
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
    <DetailsButton onClick={() => { alert('TODO: logout user'); }}>
      Logout
    </DetailsButton>
  </>;
};
