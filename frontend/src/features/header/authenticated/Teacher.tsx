import React from 'react';
import {
  SvgIconProps
} from '@mui/material';
import {
  Launch as LaunchIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
import SimpleSelect from '../SimpleSelect';
import Authenticated from './Authenticated';

const Teacher: React.FC = () => {
  const iconProps: SvgIconProps = {
    style: { marginLeft: '3px' },
    fontSize: 'small'
  };

  return <>
    <Authenticated
      userType='Teacher'
      dashboardHref={paths.teacher.dashboard._}
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
    </Authenticated>
  </>;
};

export default Teacher;
