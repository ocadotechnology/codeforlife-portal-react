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
    <Link>
      Teacher
    </Link>
    <Link>
      Student
    </Link>
    <Link>
      About us
    </Link>
    <Link>
      Help and support
    </Link>
    <Link>
      Cookie settings
    </Link>
    <Link>
      Privacy Notice
    </Link>
    <Link>
      Terms of use
    </Link>
    <Link>
      Home learning
    </Link>
    <Link>
      Get involved
    </Link>
  </SwipeableDrawer>
);

export default MenuDrawer;
