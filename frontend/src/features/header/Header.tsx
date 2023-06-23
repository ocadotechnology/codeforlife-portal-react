import React from 'react';
import {
  Backdrop,
  useMediaQuery,
  Theme
} from '@mui/material';

import { paths } from '../../app/router';
import Menu, { MenuComponents } from './menu/Menu';
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
  let Components: MenuComponents;
  function hrefIncludes(href: string): boolean {
    return window.location.href.includes(href);
  }
  if (hrefIncludes(paths.teacher.dashboard._)) {
    Components = Teacher;
  } else if (hrefIncludes(paths.student.dashboard.dependent._)) {
    Components = Student;
  } else if (hrefIncludes(paths.student.dashboard.independent._)) {
    Components = Independent;
  } else {
    Components = Unauthenticated;
  }

  return <>
    <Menu
      expanded={expanded}
      setExpanded={setExpanded}
      Components={Components}
    />
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      open={expanded}
      onClick={() => { setExpanded(false); }}
    />
  </>;
};

export default Header;
