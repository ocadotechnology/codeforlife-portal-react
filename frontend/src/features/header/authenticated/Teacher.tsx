import React from 'react';
import {
  SvgIconProps
} from '@mui/material';
import {
  Launch as LaunchIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
import { MenuComponents } from '../menu/Menu';
import MenuButton from '../menu/MenuButton';
import MenuAccordion from '../menu/MenuAccordion';
import SimpleSelect from '../SimpleSelect';
import Authenticated from './Authenticated';

const Teacher: MenuComponents = {
  Summary: () => {
    const iconProps: SvgIconProps = {
      style: { marginLeft: '3px' },
      fontSize: 'small'
    };

    return (
      <Authenticated.Summary
        userType='Teacher'
        dashboardHref={paths.teacher.dashboard._}
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
      </Authenticated.Summary>
    );
  },
  Details: () => {
    return (
      <Authenticated.Details>
        <MenuAccordion label='Teacher'>
          <MenuButton
            // TODO: set href
            spacing={2}
          >
            School / Club
          </MenuButton>
          <MenuButton
            spacing={2}
            href={paths.rapidRouter._}
          >
            Rapid Router
          </MenuButton>
          <MenuAccordion
            label='Teaching Resources'
            spacing={2}
          >
            <MenuButton
              spacing={3}
              onClick={() => {
                openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
              }}
            >
              Rapid Router
            </MenuButton>
            <MenuButton
              spacing={3}
              onClick={() => {
                openInNewTab(process.env.REACT_APP_KURONO_TEACHING_RESOURCE as string);
              }}
            >
              Kurono
            </MenuButton>
          </MenuAccordion>
        </MenuAccordion>
        {/* TODO: set this href. */}
        <MenuButton href={''}>
          Update account details
        </MenuButton>
      </Authenticated.Details>
    );
  }
};

export default Teacher;
