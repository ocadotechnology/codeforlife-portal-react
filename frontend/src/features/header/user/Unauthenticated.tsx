import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Link,
  LinkProps,
  useMediaQuery,
  Button,
  Theme
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

import { paths } from '../../../app/router';
import {
  SummaryLoginSelect
} from '../summary';
import {
  DetailsButton,
  DetailsAccordion
} from '../details';

export const UnauthenticatedSummary: React.FC = () => {
  const navigate = useNavigate();

  const upLg = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('lg')
  );

  const linkProps: LinkProps = {
    color: '#383b3b',
    variant: upLg ? 'h4' : 'h5',
    className: 'no-decor',
    marginBottom: '0px !important'
  };

  function onClick(href: string) {
    return () => { window.location.href = href; };
  }

  return <>
    <Link
      {...linkProps}
      onClick={() => { navigate(paths.teacher._); }}
    >
      Teachers
    </Link>
    <Link
      {...linkProps}
      onClick={() => { navigate(paths.student._); }}
    >
      Students
    </Link>
    <Button
      sx={{ ml: 'auto' }}
      onClick={() => { navigate(paths.register._); }}
    >
      Register
    </Button>
    <SummaryLoginSelect
      rotateIcon
      width='150px'
      text='Log in'
      IconComponent={ExpandMoreIcon}
      menuItemsProps={[
        {
          children: 'Teacher',
          icon: <ChevronRightIcon />,
          onClick: onClick(paths.login.teacher._)
        },
        {
          children: 'Student',
          icon: <ChevronRightIcon />,
          onClick: onClick(paths.login.student._)
        },
        {
          children: 'Independent',
          icon: <ChevronRightIcon />,
          onClick: onClick(paths.login.independent._)
        }
      ]}
    />
  </>;
};

export const UnauthenticatedDetails: React.FC = () => {
  const navigate = useNavigate();

  return <>
    <Button
      onClick={() => { navigate(paths.register._); }}
      style={{
        width: '100%',
        fontSize: '20px'
      }}
    >
      Register now
    </Button>
    <DetailsAccordion label='Log in'>
      <DetailsButton
        onClick={() => { navigate(paths.login.teacher._); }}
        spacing={2}
      >
        Teacher
      </DetailsButton>
      <DetailsButton
        onClick={() => { navigate(paths.login.student._); }}
        spacing={2}
      >
        Student
      </DetailsButton>
      <DetailsButton
        onClick={() => { navigate(paths.login.independent._); }}
        spacing={2}
      >
        Independent
      </DetailsButton>
    </DetailsAccordion>
    <DetailsButton onClick={() => { navigate(paths.teacher._); }}>
      Teachers
    </DetailsButton>
    <DetailsButton onClick={() => { navigate(paths.student._); }}>
      Students
    </DetailsButton>
  </>;
};
