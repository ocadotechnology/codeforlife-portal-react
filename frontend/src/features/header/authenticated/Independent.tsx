import React from 'react';
import {
  SvgIconProps,
  useTheme
} from '@mui/material';
import {
  Launch as LaunchIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
import { MenuComponents } from '../menu/Menu';
import MenuAccordion from '../menu/MenuAccordion';
import MenuButton from '../menu/MenuButton';
import SimpleSelect from '../SimpleSelect';
import Authenticated from './Authenticated';

const Independent: MenuComponents = {
  Summary: () => {
    const iconProps: SvgIconProps = {
      style: { marginLeft: '3px' },
      fontSize: 'small'
    };

    return (
      <Authenticated.Summary
        userType='Independent'
        dashboardHref={paths.student.dashboard.independent._}
        menuItemsProps={[
          {
            children: 'Update account details',
            icon: <ManageAccountsOutlinedIcon />
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
            }
          ]}
        />
        <SimpleSelect
          text='Learning Resources'
          menuItemsProps={[
            {
              children: <>
                Rapid Router
                <LaunchIcon {...iconProps} />
              </>,
              onClick: () => {
                openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
              }
            }
          ]}
        />
      </Authenticated.Summary>
    );
  },
  Details: () => {
    const theme = useTheme();

    return (
      <Authenticated.Details>
        <MenuAccordion label='Independent'>
          <MenuButton
            spacing={2}
            href={paths.student.dashboard.dependent._}
            bgcolor={theme.palette.secondary}
          >
            Dashboard
          </MenuButton>
          <MenuAccordion
            spacing={2}
            label='Games'
            bgcolor={theme.palette.secondary}
          >
            <MenuButton
              spacing={3}
              href={paths.rapidRouter._}
              bgcolor={theme.palette.secondary}
            >
              Rapid Router
            </MenuButton>
          </MenuAccordion>
          <MenuAccordion
            spacing={2}
            label='Learning resources'
            bgcolor={theme.palette.secondary}
          >
            <MenuButton
              spacing={3}
              onClick={() => {
                openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
              }}
              bgcolor={theme.palette.secondary}
            >
              Rapid Router
            </MenuButton>
          </MenuAccordion>
        </MenuAccordion>
      </Authenticated.Details>
    );
  }
};

export default Independent;
