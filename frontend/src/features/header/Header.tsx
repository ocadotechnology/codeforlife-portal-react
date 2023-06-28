import React from 'react';
import {
  Accordion,
  accordionSummaryClasses,
  accordionDetailsClasses,
  buttonClasses,
  svgIconClasses,
  Backdrop,
  useMediaQuery,
  Theme,
  useTheme
} from '@mui/material';

import { paths } from '../../app/router';
import { Summary, SummaryProps } from './summary';
import { Details, DetailsProps } from './details';
import {
  UnauthenticatedSummary, UnauthenticatedDetails,
  TeacherSummary, TeacherDetails,
  StudentSummary, StudentDetails,
  IndependentSummary, IndependentDetails
} from './user';

const Header: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const upLg = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('lg')
  );

  if (expanded && upLg) setExpanded(false);

  let children: {
    summary: SummaryProps['children'];
    details: DetailsProps['children'];
  };

  // TODO: check if the use is logged in and account type.
  // This is temporary for testing purposes.
  function hrefIncludes(href: string): boolean {
    return window.location.href.includes(href);
  }
  if (hrefIncludes(paths.teacher.dashboard._)) {
    children = {
      summary: <TeacherSummary />,
      details: <TeacherDetails />
    };
  } else if (hrefIncludes(paths.student.dashboard.dependent._)) {
    children = {
      summary: <StudentSummary />,
      details: <StudentDetails />
    };
  } else if (hrefIncludes(paths.student.dashboard.independent._)) {
    children = {
      summary: <IndependentSummary />,
      details: <IndependentDetails />
    };
  } else {
    children = {
      summary: <UnauthenticatedSummary />,
      details: <UnauthenticatedDetails />
    };
  }

  return <>
    <Accordion
      expanded={expanded}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar,
        boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        maxHeight: '100vh',
        overflowY: 'auto',
        [`.${accordionSummaryClasses.root}`]: {
          padding: '0px',
          backgroundColor: 'white !important'
        },
        [`.${accordionSummaryClasses.content}`]: {
          margin: '0px !important'
        },
        [`.${accordionDetailsClasses.root}`]: {
          padding: '0px !important',
          [`.${buttonClasses.root}`]: {
            padding: '24px 12px',
            width: '100%',
            fontSize: '20px'
          },
          [`.${buttonClasses.text}`]: {
            color: theme.typography.body1.color,
            borderTop: `2px solid ${theme.palette.info.main}`
          },
          [`.${buttonClasses.endIcon}`]: {
            marginLeft: 'auto'
          },
          [`.${svgIconClasses.root}`]: {
            fontSize: '27px',
            color: 'black'
          }
        }
      }}
    >
      <Summary
        expanded={expanded}
        setExpanded={setExpanded}
      >
        {children.summary}
      </Summary>
      <Details>
        {children.details}
      </Details>
    </Accordion>
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      open={expanded}
      onClick={() => { setExpanded(false); }}
    />
  </>;
};

export default Header;
