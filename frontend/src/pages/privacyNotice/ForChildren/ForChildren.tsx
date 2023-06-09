import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

import Page from 'codeforlife/lib/esm/components/page';

import { paths } from '../../../app/router';
import TableOfContents from '../../../components/TableOfContents';
import WhoWeAre from './WhoWeAre';
import PersonalInfo from './PersonalInfo';
import HowWeUseInfo from './HowWeUseInfo';
import ChangeOfPurpose from './ChangeOfPurpose';
import Cookies from './Cookies';
import WhoWeShareInfoWith from './WhoWeShareInfoWith';
import HowLongWeKeepData from './HowLongWeKeepData';
import YourRights from './YourRights';
import KeepingInfoSecure from './KeepingInfoSecure';
import HowToComplain from './HowToComplain';
import ChangesToPrivacyNotice from './ChangesToPrivacyNotice';
import HowToContactUs from './HowToContactUs';
import ExtraHelp from './ExtraHelp';

const ForChildren: React.FC = () => (
  <Page.Section>
    <Typography fontWeight='bold'>
      Last Updated: 25th January 2023
    </Typography>
    <Typography>
      This Privacy Notice will tell you what information we collect about you, how we use it, who we share it with, how long we keep it and how you can ask us about it.
    </Typography>
    <Typography>
      This is the version of the Privacy Notice without all the legal jargon (we understand how overly complicated some privacy policies can be!) A full version of the Privacy Notice can be found by clicking&nbsp;
      <Link className='body' href={paths.privacyNotice.privacyNotice._}>
        here
      </Link>
      .
    </Typography>
    <Typography>
      What we mean by ‘personal information’ is any information that can be used to identify you, such as your name and email address.
    </Typography>
    <TableOfContents contents={[
      {
        header: 'Who we are',
        element: <WhoWeAre />
      },
      {
        header: 'Personal information we collect about you',
        element: <PersonalInfo />
      },
      {
        header: 'How we will use the information',
        element: <HowWeUseInfo />
      },
      {
        header: 'Change of purpose',
        element: <ChangeOfPurpose />
      },
      {
        header: 'Cookies & Similar technologies',
        element: <Cookies />
      },
      {
        header: 'Who might we share your personal information with?',
        element: <WhoWeShareInfoWith />
      },
      {
        header: 'How long will we keep your personal data?',
        element: <HowLongWeKeepData />
      },
      {
        header: 'Your rights',
        element: <YourRights />
      },
      {
        header: 'Keeping your information secure',
        element: <KeepingInfoSecure />
      },
      {
        header: 'How to complain',
        element: <HowToComplain />
      },
      {
        header: 'Changes to the Privacy Notice',
        element: <ChangesToPrivacyNotice />
      },
      {
        header: 'How to contact us',
        element: <HowToContactUs />
      },
      {
        header: 'Do you need extra help?',
        element: <ExtraHelp />
      }
    ]} />
  </Page.Section>
);

export default ForChildren;
