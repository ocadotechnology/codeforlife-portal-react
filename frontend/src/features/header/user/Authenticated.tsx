import React from 'react';
import {
  useNavigate,
  NavigateFunction
} from 'react-router-dom';
import { MutationDefinition } from '@reduxjs/toolkit/dist/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
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

import { useLogoutUserMutation } from '../../../app/api';
import { paths } from '../../../app/router';
import {
  SummaryLoginSelect,
  SummaryLoginSelectProps
} from '../summary';
import {
  DetailsButton
} from '../details';

function handleLogout(
  logoutUser: MutationTrigger<MutationDefinition<null, any, any, any>>,
  navigate: NavigateFunction
) {
  return () => {
    logoutUser(null)
      .unwrap()
      .then(() => { navigate(paths._); })
      .catch(() => { alert('Logout failed.'); });
  };
}

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
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
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
      onClick={() => { navigate(dashboardHref); }}
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
          icon: <LogoutOutlinedIcon />,
          onClick: handleLogout(logoutUser, navigate)
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
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

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
    <DetailsButton onClick={handleLogout(logoutUser, navigate)}>
      Logout
    </DetailsButton>
  </>;
};
