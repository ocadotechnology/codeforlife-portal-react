import React from 'react';
import {
  Link,
  useTheme
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import { MenuComponents } from '../menu/Menu';
import MenuButton from '../menu/MenuButton';
import MenuAccordion from '../menu/MenuAccordion';
import SimpleSelect from '../SimpleSelect';
import Authenticated from './Authenticated';

const Student: MenuComponents = {
  Summary: () => {
    return (
      <Authenticated.Summary
        userType='Student'
        dashboardHref={paths.student.dashboard.dependent._}
        menuItemsProps={[
          {
            children: 'Change password',
            icon: <LockOutlinedIcon />
          }
        ]}
      >
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
        <Link
          className='no-decor'
          href={paths.rapidRouter.scoreboard._}
        >
          Scoreboard
        </Link>
      </Authenticated.Summary>
    );
  },
  Details: () => {
    const theme = useTheme();

    return (
      <Authenticated.Details>
        <MenuAccordion label='Student'>
          <MenuButton
            spacing={2}
            href={paths.student.dashboard.dependent._}
            bgcolor={theme.palette.tertiary}
          >
            Dashboard
          </MenuButton>
          <MenuAccordion
            spacing={2}
            label='Games'
            bgcolor={theme.palette.tertiary}
          >
            <MenuButton
              spacing={3}
              href={paths.rapidRouter._}
              bgcolor={theme.palette.tertiary}
            >
              Rapid Router
            </MenuButton>
            <MenuButton
              spacing={3}
              href={paths.kurono._}
              bgcolor={theme.palette.tertiary}
            >
              Kurono
            </MenuButton>
          </MenuAccordion>
          <MenuButton
            spacing={2}
            href={paths.rapidRouter.scoreboard._}
            bgcolor={theme.palette.tertiary}
          >
            Scoreboard
          </MenuButton>
        </MenuAccordion>
      </Authenticated.Details>
    );
  }
};

export default Student;
