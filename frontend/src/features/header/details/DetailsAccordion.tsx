import React from 'react';
import {
  Accordion,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionDetails,
  Typography,
  useTheme,
  svgIconClasses
} from '@mui/material';
import {
  ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';

export interface DetailsAccordionProps {
  label: string;
  children: React.ReactNode;
  spacing?: number;
  bgcolor?: {
    main: string;
    contrastText: string;
  };
}

const DetailsAccordion: React.FC<DetailsAccordionProps> = ({
  label,
  children,
  spacing = 1,
  bgcolor
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => { setExpanded((expanded) => !expanded); }}
      style={{
        borderTop: `2px solid ${theme.palette.info.main}`
      }}
      sx={{
        ...(bgcolor !== undefined && {
          [`.${accordionSummaryClasses.root}`]: {
            bgcolor: `${bgcolor.main} !important`
          }
        })
      }}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        sx={{
          paddingTop: '10px !important',
          paddingRight: '12px !important',
          paddingBottom: '10px !important',
          paddingLeft: `${12 * spacing}px !important`,
          [`.${svgIconClasses.root}`]: {
            color: `${bgcolor !== undefined
              ? bgcolor.contrastText
              : 'black'
              } 
            !important`
          }
        }}
      >
        <Typography
          mb={0}
          fontSize='20px !important'
          fontWeight={550}
          color={bgcolor?.contrastText}
        >
          {label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default DetailsAccordion;
