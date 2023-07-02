import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SvgIconProps
} from '@mui/material';
import {
  Launch as LaunchIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import { openInNewTab } from 'codeforlife/lib/esm/helpers';
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

export const TeacherSummary: React.FC = () => {
  const iconProps: SvgIconProps = {
    style: { marginLeft: '3px' },
    fontSize: 'small'
  };

  return (
    <AuthenticatedSummary
      userType='Teacher'
      dashboardHref={paths.teacher.dashboard.school._}
      menuItemsProps={[
        {
          children: 'Update account details',
          icon: <ManageAccountsOutlinedIcon />,
          onClick: () => {
            window.location.href = paths.teacher.dashboard.account._;
          }
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
      <SummarySelect
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
    </AuthenticatedSummary>
  );
};

export const TeacherDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthenticatedDetails>
      <DetailsAccordion label='Teacher'>
        <DetailsButton
          onClick={() => { navigate(paths.teacher.dashboard.school._); }}
          spacing={2}
        >
          School / Club
        </DetailsButton>
        <DetailsButton
          spacing={2}
          href={paths.rapidRouter._}
        >
          Rapid Router
        </DetailsButton>
        <DetailsAccordion
          label='Teaching Resources'
          spacing={2}
        >
          <DetailsButton
            spacing={3}
            onClick={() => {
              openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
            }}
          >
            Rapid Router
          </DetailsButton>
          <DetailsButton
            spacing={3}
            onClick={() => {
              openInNewTab(process.env.REACT_APP_KURONO_TEACHING_RESOURCE as string);
            }}
          >
            Kurono
          </DetailsButton>
        </DetailsAccordion>
      </DetailsAccordion>
      <DetailsButton onClick={() => { navigate(paths.teacher.dashboard.account._); }}>
        Update account details
      </DetailsButton>
    </AuthenticatedDetails>
  );
};
