import React from 'react';
import {
  IconButton,
  Box,
  Stack,
  Container,
  Backdrop,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
  Theme,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import CflLogo from '../../images/cfl_logo.png';
import OgLogo from '../../images/ocado_group.svg';
import MenuAccordion, { Menu } from './MenuAccordion';
import Unauthenticated from './Unauthenticated';
import Teacher from './authenticated/Teacher';
import Student from './authenticated/Student';
import Independent from './authenticated/Independent';

const Header: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const upLg = useMediaQuery(
    (theme: Theme) => theme.breakpoints.up('lg')
  );

  if (expanded && upLg) setExpanded(false);

  // TODO: check if the use is logged in and account type.
  // This is temporary for testing purposes.
  let Menu: Menu;
  function hrefIncludes(href: string): boolean {
    return window.location.href.includes(href);
  }
  // if (hrefIncludes(paths.teacher.dashboard._)) {
  //   menu = <Teacher />;
  // } else if (hrefIncludes(paths.student.dashboard.dependent._)) {
  //   menu = <Student />;
  // } else if (hrefIncludes(paths.student.dashboard.independent._)) {
  //   menu = <Independent />;
  // } else {
  Menu = Unauthenticated;
  // }

  return <>
    <MenuAccordion
      expanded={expanded}
      setExpanded={setExpanded}
      Menu={Menu}
    />
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      open={expanded}
      onClick={() => { setExpanded(false); }}
    />
  </>;
};

export default Header;
