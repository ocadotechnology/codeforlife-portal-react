import React from 'react';
import {
  useTheme,
  Link
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import { paths } from '../../app/router';
import Games from './Games';
import RapidRouterProgress from './RapidRouterProgress';
import KuronoProgress from './KuronoProgress';

export interface BaseDashboardProps {
  isDependent: boolean;
}

const BaseDashboard: React.FC<BaseDashboardProps> = ({
  isDependent
}) => {
  const theme = useTheme();

  // TODO: get from api store.
  const name = 'John';
  const classCode = 1;

  return <>
    <Page.Banner
      header={`Welcome, ${name}`}
      subheader='This is where you can access your games'
      textAlign='center'
      bgcolor={isDependent ? 'secondary' : 'tertiary'}
    />
    <Page.Notification>
      {isDependent
        ? <>You are logged in to class: {classCode}</>
        : <>
          You are logged in as an independent student.
          If you want to join a school, you need to&nbsp;
          <Link
            href={paths._}
            color="inherit"
            underline="always"
          >
            request to join one
          </Link>
          .
        </>
      }
    </Page.Notification>
    <Page.Section>
      <Games isDependent={isDependent} />
    </Page.Section>
    <Page.Section gridProps={{ bgcolor: theme.palette.info.main }}>
      <RapidRouterProgress isDependent={isDependent} />
    </Page.Section>
    <Page.Section>
      <KuronoProgress isDependent={isDependent} />
    </Page.Section>
  </>;
};

export default BaseDashboard;
