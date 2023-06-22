import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  buttonClasses
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

export interface MenuAccordionProps {
  label: string;
  children: React.ReactNode;
  nesting: number;
}

const MenuAccordion: React.FC<MenuAccordionProps> = ({
  label,
  children,
  nesting
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => { setExpanded((expanded) => !expanded); }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          padding: '12px !important'
        }}
      >
        <Typography
          mb={0}
          fontSize='20px'
          fontWeight={550}
        >
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{
        [`.${buttonClasses.root}`]: {
          paddingLeft: `${18 * nesting}px !important`
        }
      }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuAccordion;
