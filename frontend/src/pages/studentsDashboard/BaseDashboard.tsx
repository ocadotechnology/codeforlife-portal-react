import React from 'react';
import {
  useTheme,
  Link
} from '@mui/material';

import { paths } from '../../app/router';
import PageSection from '../../components/PageSection';
import PageBanner from '../../components/PageBanner';
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
    <PageBanner
      text={{
        title: `Welcome, ${name}`,
        content: 'This is where you can access your games'
      }}
      textAlign='center'
      bgcolor={isDependent ? 'secondary' : 'tertiary'}
      notification={isDependent
        ? <>You are logged in to class: {classCode}</>
        : <>
          You are logged in as an independent student.
          If you want to join a school, you need to&nbsp;
          <Link
            href={paths.home}
            color="inherit"
            underline="always"
          >
            request to join one
          </Link>
          .
        </>
      }
    />
    <PageSection>
      <Games isDependent={isDependent} />
    </PageSection>
    <PageSection bgcolor={theme.palette.info.main}>
      <RapidRouterProgress isDependent={isDependent} />
    </PageSection>
    <PageSection>
      <KuronoProgress isDependent={isDependent} />
    </PageSection>
  </>;
};

export default BaseDashboard;
