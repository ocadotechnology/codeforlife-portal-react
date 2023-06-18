import React from 'react';
import {
  Typography,
  Link,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon
} from '@mui/icons-material';

import LoginSelect from './LoginSelect';

const Authenticated: React.FC<{
  userType: string;
  dashboardHref: string;
  children: React.ReactNode;
}> = ({
  userType,
  dashboardHref,
  children
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
        getIcon={() => <PersonOutlineOutlinedIcon />}
        menuItemsProps={[
          {
            children: 'Log out',
            icon: <LogoutOutlinedIcon />
          },
          {
            children: 'Update account details',
            icon: <ManageAccountsOutlinedIcon />
          }
        ]}
        sx={{ marginLeft: 'auto' }}
      />
    </>;
  };

export default Authenticated;
