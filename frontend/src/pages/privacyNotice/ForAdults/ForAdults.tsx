import React from 'react';
import {
  Typography
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import TableOfContents from '../../../components/TableOfContents';

import OurCommitment from './OurCommitment';
import WhoWeAre from './WhoWeAre';
import TypesOfInfo from './TypesOfInfo';
import HowWeUseInfo from './HowWeUseInfo';
import ChangeOfPurpose from './ChangeOfPurpose';
import Cookies from './Cookies';
import SharingInfo from './SharingInfo';
import KeepInfo from './KeepInfo';
import YourRights from './YourRights';
import InfoSecurity from './InfoSecurity';
import HowToComplain from './HowToComplain';
import Changes from './Changes';
import ContactUs from './ContactUs';
import ExtraHelp from './ExtraHelp';

const ForAdults: React.FC = () => (
  <Page.Section>
    <Typography fontWeight='bold'>
      Last Updated: 25th January 2023
    </Typography>
    <Typography>
      Please read this notice carefully. This notice contains important information on who manages the Code for Life portal, how and why we collect information about you (for example, your name and email address), how we use your information, and with which persons we share your information. We also explain what rights you have in relation to your personal information, for example, the right to say no to the use of your information in certain cases, and how to contact us if you want to find out more about your rights or if you have other questions about this notice.
    </Typography>
    <TableOfContents contents={[
      {
        header: 'Our commitment',
        element: <OurCommitment />
      },
      {
        header: 'Who we are',
        element: <WhoWeAre />
      },
      {
        header: 'Types of information we hold about you',
        element: <TypesOfInfo />
      },
      {
        header: 'How we will use information about you',
        element: <HowWeUseInfo />
      },
      {
        header: 'Change of purpose',
        element: <ChangeOfPurpose />
      },
      {
        header: 'Cookies',
        element: <Cookies />
      },
      {
        header: 'Sharing your personal information with other persons',
        element: <SharingInfo />
      },
      {
        header: 'How long will we keep your personal information?',
        element: <KeepInfo />
      },
      {
        header: 'Your rights',
        element: <YourRights />
      },
      {
        header: 'Keeping your personal information secure',
        element: <InfoSecurity />
      },
      {
        header: 'How to complain',
        element: <HowToComplain />
      },
      {
        header: 'Changes to this Privacy Notice',
        element: <Changes />
      },
      {
        header: 'How to contact us',
        element: <ContactUs />
      },
      {
        header: 'Do you need extra help?',
        element: <ExtraHelp />
      }
    ]} />
  </Page.Section>
);

export default ForAdults;
