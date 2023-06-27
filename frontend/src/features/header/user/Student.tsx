import React from 'react';
import {
  Link,
  useTheme
} from '@mui/material';
import {
  LockOutlined as LockOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import {
  SummarySelect
} from '../summary';
import {
  DetailsButton,
  DetailsAccordion
} from '../details';
import {
  AuthenticatedSummary,
  AuthenticatedDetails
} from './Authenticated';

export const StudentSummary: React.FC = () => {
  return (
    <AuthenticatedSummary
      userType='Student'
      dashboardHref={paths.student.dashboard.dependent._}
      menuItemsProps={[
        {
          children: 'Change password',
          icon: <LockOutlinedIcon />
        }
      ]}
    >
      <SummarySelect
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
    </AuthenticatedSummary>
  );
};

export const StudentDetails: React.FC = () => {
  const theme = useTheme();

  return (
    <AuthenticatedDetails>
      <DetailsAccordion label='Student'>
        <DetailsButton
          spacing={2}
          href={paths.student.dashboard.dependent._}
          bgcolor={theme.palette.tertiary}
        >
          Dashboard
        </DetailsButton>
        <DetailsAccordion
          spacing={2}
          label='Games'
          bgcolor={theme.palette.tertiary}
        >
          <DetailsButton
            spacing={3}
            href={paths.rapidRouter._}
            bgcolor={theme.palette.tertiary}
          >
            Rapid Router
          </DetailsButton>
          <DetailsButton
            spacing={3}
            href={paths.kurono._}
            bgcolor={theme.palette.tertiary}
          >
            Kurono
          </DetailsButton>
        </DetailsAccordion>
        <DetailsButton
          spacing={2}
          href={paths.rapidRouter.scoreboard._}
          bgcolor={theme.palette.tertiary}
        >
          Scoreboard
        </DetailsButton>
      </DetailsAccordion>
    </AuthenticatedDetails>
  );
};
