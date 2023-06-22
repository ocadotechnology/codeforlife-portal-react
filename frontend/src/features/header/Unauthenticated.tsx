import React from 'react';
import {
  Link,
  LinkProps,
  useMediaQuery,
  Button,
  selectClasses,
  Theme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { includesClassNames } from 'codeforlife/lib/esm/helpers';

import { paths } from '../../app/router';
import { MenuComponents } from './menu/Menu';
import LoginSelect from './LoginSelect';
import MenuButton from './menu/MenuButton';
import MenuAccordion from './menu/MenuAccordion';

const Unauthenticated: MenuComponents = {
  Summary: () => {
    const upLg = useMediaQuery(
      (theme: Theme) => theme.breakpoints.up('lg')
    );

    const linkProps: LinkProps = {
      color: '#383b3b',
      variant: upLg ? 'h4' : 'h5',
      className: 'no-decor',
      marginBottom: '0px !important'
    };

    function onClick(href: string) {
      return () => { window.location.href = href; };
    }

    return <>
      <Link {...linkProps} href={paths.teacher._}>
        Teachers
      </Link>
      <Link {...linkProps} href={paths.student._}>
        Students
      </Link>
      <Button
        sx={{ ml: 'auto' }}
        href={paths.register._}
      >
        Register
      </Button>
      <LoginSelect
        width='150px'
        text='Log in'
        getIcon={(props) => (
          includesClassNames(props, [selectClasses.iconOpen])
            ? <ExpandLessIcon />
            : <ExpandMoreIcon />
        )}
        menuItemsProps={[
          {
            children: 'Teacher',
            icon: <ChevronRightIcon />,
            onClick: onClick(paths.login.teacher._)
          },
          {
            children: 'Student',
            icon: <ChevronRightIcon />,
            onClick: onClick(paths.login.student._)
          },
          {
            children: 'Independent',
            icon: <ChevronRightIcon />,
            onClick: onClick(paths.login.independent._)
          }
        ]}
      />
    </>;
  },
  Details: () => {
    return <>
      <Button
        href={paths.register._}
        style={{
          width: '100%',
          fontSize: '20px'
        }}
      >
        Register now
      </Button>
      <MenuAccordion label='Log in' nesting={2}>
        <MenuButton href={paths.login.teacher._}>
          Teacher
        </MenuButton>
        <MenuButton href={paths.login.student._}>
          Student
        </MenuButton>
        <MenuButton href={paths.login.independent._}>
          Independent
        </MenuButton>
      </MenuAccordion>
      <MenuButton href={paths.teacher._}>
        Teachers
      </MenuButton>
      <MenuButton href={paths.student._}>
        Students
      </MenuButton>
    </>;
  }
};

export default Unauthenticated;
