import React from 'react';
import {
  IconButton,
  Stack,
  Container,
  Accordion,
  AccordionSummary,
  accordionSummaryClasses,
  AccordionDetails,
  accordionDetailsClasses,
  buttonClasses,
  useTheme,
  svgIconClasses
} from '@mui/material';
import Hamburger from 'hamburger-react';

import { Image } from 'codeforlife/lib/esm/components';
import {
  useFreshworksWidget,
  useOneTrustInfoToggle
} from 'codeforlife/lib/esm/hooks';

import { paths } from '../../../app/router';
import CflLogo from '../../../images/cfl_logo.png';
import OgLogo from '../../../images/ocado_group.svg';
import MenuButton from './MenuButton';

export interface MenuComponents<
  SummaryProps = any,
  DetailsProps = any
> {
  Summary: React.FC<SummaryProps>;
  Details: React.FC<DetailsProps>;
}

const Menu: React.FC<{
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  Components: MenuComponents;
}> = ({
  expanded,
  setExpanded,
  Components
}) => {
    const theme = useTheme();

    return (
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
        <AccordionSummary>
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
                <Components.Summary />
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
        <AccordionDetails>
          <Components.Details />
          <MenuButton href={paths.aboutUs._}>
            About us
          </MenuButton>
          <MenuButton
            onClick={() => { useFreshworksWidget('open'); }}
          >
            Help and support
          </MenuButton>
          <MenuButton onClick={useOneTrustInfoToggle}>
            Cookie settings
          </MenuButton>
          <MenuButton href={paths.privacyNotice._}>
            Privacy notice
          </MenuButton>
          <MenuButton href={paths.termsOfUse._}>
            Terms of use
          </MenuButton>
          <MenuButton href={paths.homeLearning._}>
            Home learning
          </MenuButton>
          <MenuButton href={paths.getInvolved._}>
            Get involved
          </MenuButton>
        </AccordionDetails>
      </Accordion>
    );
  };

export default Menu;
