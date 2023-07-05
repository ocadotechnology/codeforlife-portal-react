import React from 'react';
import { useNavigate } from 'react-router-dom';
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

export const IndependentSummary: React.FC = () => {
  const navigate = useNavigate();

  const iconProps: SvgIconProps = {
    style: { marginLeft: '3px' },
    fontSize: 'small'
  };

  return (
    <AuthenticatedSummary
      userType='Independent'
      dashboardHref={paths.student.dashboard.independent._}
      menuItemsProps={[
        {
          children: 'Update account details',
          icon: <ManageAccountsOutlinedIcon />,
          onClick: () => { navigate(paths.student.dashboard.independent.account._); }
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
          }
        ]}
      />
      <SummarySelect
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
    </AuthenticatedSummary>
  );
};

export const IndependentDetails: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AuthenticatedDetails>
      <DetailsAccordion label='Independent'>
        <DetailsButton
          spacing={2}
          onClick={() => { navigate(paths.student.dashboard.independent._); }}
          bgcolor={theme.palette.secondary}
        >
          Dashboard
        </DetailsButton>
        <DetailsAccordion
          spacing={2}
          label='Games'
          bgcolor={theme.palette.secondary}
        >
          <DetailsButton
            spacing={3}
            onClick={() => { navigate(paths.rapidRouter._); }}
            bgcolor={theme.palette.secondary}
          >
            Rapid Router
          </DetailsButton>
        </DetailsAccordion>
        <DetailsAccordion
          spacing={2}
          label='Learning resources'
          bgcolor={theme.palette.secondary}
        >
          <DetailsButton
            spacing={3}
            onClick={() => {
              openInNewTab(process.env.REACT_APP_RR_TEACHING_RESOURCE as string);
            }}
            bgcolor={theme.palette.secondary}
          >
            Rapid Router
          </DetailsButton>
        </DetailsAccordion>
      </DetailsAccordion>
      <DetailsButton onClick={() => { navigate(paths.student.dashboard.independent.account._); }}>
        Update account details
      </DetailsButton>
    </AuthenticatedDetails>
  );
};
