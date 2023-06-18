import React from 'react';
import {
  Typography,
  Link,
  useTheme,
  useMediaQuery,
  SvgIconProps
} from '@mui/material';
import {
  Launch as LaunchIcon,
  PersonOutlineOutlined as PersonOutlineOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
import SimpleSelect from './SimpleSelect';
import LoginSelect from './LoginSelect';

const Teacher: React.FC = () => {
  const theme = useTheme();
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));

  // TODO: get from API.
  const userName = 'John Doe';

  const iconProps: SvgIconProps = {
    style: { marginLeft: '3px' },
    fontSize: 'small'
  };

  return <>
    <Typography
      variant={upLg ? 'h4' : 'h5'}
      marginBottom={0}
    >
      Teacher
    </Typography>
    <Link
      className='no-decor'
      href={paths.teacher.dashboard._}
    >
      Dashboard
    </Link>
    <SimpleSelect
      text='Games'
      menuItemsProps={[
        {
          children: 'Rapid Router',
          onClick: () => {
            window.location.href = paths.rapidRouter._;
          }
        },
        {
          children: 'Kurono',
          onClick: () => {
            window.location.href = paths.kurono._;
          }
        }
      ]}
    />
    <SimpleSelect
      text='Teaching Resources'
      menuItemsProps={[
        {
          children: <>
            Rapid Router
            <LaunchIcon {...iconProps} />
          </>,
          onClick: () => {
            openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
          }
        },
        {
          children: <>
            Kurono&nbsp;
            <LaunchIcon {...iconProps} />
          </>,
          onClick: () => {
            openInNewTab(process.env.REACT_APP_KURONO_TEACHING_RESOURCE as string);
          }
        },
        {
          children: 'Coding Clubs',
          onClick: () => {
            window.location.href = paths.codingClubs._;
          }
        }
      ]}
    />
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

export default Teacher;
