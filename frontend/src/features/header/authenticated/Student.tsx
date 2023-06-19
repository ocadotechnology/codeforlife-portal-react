import React from 'react';
import {
  Link
} from '@mui/material';

import { paths } from '../../../app/router';
import SimpleSelect from '../SimpleSelect';
import Authenticated from './Authenticated';

const Student: React.FC = () => {
  return <>
    <Authenticated
      userType='Student'
      dashboardHref={paths.student.dashboard.dependent._}
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
    </Authenticated>
  </>;
};

export default Student;
