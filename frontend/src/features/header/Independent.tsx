import React from 'react';
import {
  SvgIconProps
} from '@mui/material';
import {
  Launch as LaunchIcon
} from '@mui/icons-material';

import { paths } from '../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
import SimpleSelect from './SimpleSelect';
import Authenticated from './Authenticated';

const Independent: React.FC = () => {
  const iconProps: SvgIconProps = {
    style: { marginLeft: '3px' },
    fontSize: 'small'
  };

  return <>
    <Authenticated
      userType='Independent'
      dashboardHref={paths.student.dashboard.independent._}
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
    </Authenticated>
  </>;
};

export default Independent;
