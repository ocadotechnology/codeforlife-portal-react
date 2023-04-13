import React from 'react';
import {
  SwipeableDrawer,
  Button,
  Link,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';

import { paths } from 'app/router';

const MenuDrawer: React.FC<{
  isOpen: boolean,
  setIsOpen: (open: boolean) => void
}> = ({ isOpen, setIsOpen }) => (
  <SwipeableDrawer
    anchor='right'
    open={isOpen}
    onClose={() => { setIsOpen(false); }}
    onOpen={() => { setIsOpen(true); }}
  >
    <Button>
      Register now
    </Button>
    <Accordion>
      <AccordionSummary>
        <Typography>Log in &gt;</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Link>
          Student
        </Link>
        <Divider />
        <Link>
          Teacher
        </Link>
        <Divider />
        <Link>
          Independent
        </Link>
      </AccordionDetails>
    </Accordion>
    <Link href={paths.teachers}>
      Teachers
    </Link>
    <Link href={paths.students}>
      Students
    </Link>
    <Link href={paths.aboutUs}>
      About us
    </Link>
    <Link>
      Help and support
    </Link>
    <Link>
      Cookie settings
    </Link>
    <Link href={paths.privacyNotice}>
      Privacy Notice
    </Link>
    <Link href={paths.termsOfUse}>
      Terms of use
    </Link>
    <Link href={paths.homeLearning}>
      Home learning
    </Link>
    <Link href={paths.getInvolved}>
      Get involved
    </Link>
  </SwipeableDrawer>
);

export default MenuDrawer;
