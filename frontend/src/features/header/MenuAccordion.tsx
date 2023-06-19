import React from 'react';
import {
  IconButton,
  Stack,
  Container,
  Accordion,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionDetails,
  Button,
  ButtonProps,
  buttonClasses,
  useTheme
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import Hamburger from 'hamburger-react';

import { Image } from 'codeforlife/lib/esm/components';

import { paths } from '../../app/router';
import CflLogo from '../../images/cfl_logo.png';
import OgLogo from '../../images/ocado_group.svg';

export interface Menu {
  Summary: React.FC;
  Details: React.FC;
}

const MenuAccordion: React.FC<{
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  Menu: Menu;
}> = ({
  expanded,
  setExpanded,
  Menu
}) => {
    const theme = useTheme();

    const commonButtonProps: ButtonProps = {
      variant: 'text',
      endIcon: <ChevronRightIcon />
    };

    return (
      <Accordion
        expanded={expanded}
        style={{
          width: '100%',
          boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar }}
      >
        <AccordionSummary sx={{
          padding: '0px !important',
          [`.${accordionSummaryClasses.content}`]: {
            margin: '0px !important'
          }
        }}>
          <Container
            maxWidth='xl'
            sx={{
              height: { xs: '80px', lg: '100px' },
              paddingY: '15px'
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              height='100%'
              width='100%'
              gap={5}
            >
              <Image
                alt='Code for Life'
                src={CflLogo}
                maxWidth={{ xs: '65px', lg: '80px' }}
                href={paths._}
                marginRight={{ xs: 0, lg: '10px' }}
              />
              <Image
                alt='Ocado Group'
                src={OgLogo}
                maxWidth={{ xs: '115px', lg: '150px' }}
                mx={{ xs: 'auto', lg: 0 }}
                href={process.env.REACT_APP_OCADO_GROUP_HREF}
                hrefInNewTab
              />
              <Stack
                direction='row'
                alignItems='center'
                height='100%'
                width='100%'
                gap={3}
                display={{ xs: 'none', lg: 'flex' }}
              >
                <Menu.Summary />
              </Stack>
              <IconButton sx={{ display: { lg: 'none' } }}>
                <Hamburger
                  toggled={expanded}
                  direction='right'
                  size={20}
                  onToggle={(toggled) => { setExpanded(toggled); }}
                />
              </IconButton>
            </Stack>
          </Container>
        </AccordionSummary>
        <AccordionDetails sx={{
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
          }
        }}>
          <Menu.Details />
          <Button
            {...commonButtonProps}
          >
            About us
          </Button>
          <Button
            {...commonButtonProps}
          >
            Help and support
          </Button>
          <Button
            {...commonButtonProps}
          >
            Cookie settings
          </Button>
          <Button
            {...commonButtonProps}
          >
            Privacy notice
          </Button>
          <Button
            {...commonButtonProps}
          >
            Terms of use
          </Button>
          <Button
            {...commonButtonProps}
          >
            Home learning
          </Button>
          <Button
            {...commonButtonProps}
          >
            Get involved
          </Button>
        </AccordionDetails>
      </Accordion>
    );
  };

export default MenuAccordion;
