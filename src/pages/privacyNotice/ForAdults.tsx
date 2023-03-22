import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  ListItem
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

import TableOfContents from 'components/TableOfContents';

const OurCommitment: React.FC = () => (
  <>
    <Typography>
      We are deeply committed to creating a safe and secure online learning environment for all students, teachers, parents and guardians who use the Code for Life portal.
    </Typography>
    <ItemizedList styleType='decimal'>
      <ListItem>
        <Typography>
          We strive to give you control over the personal information that you give us, and we take the protection of your information very seriously.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          We take extra precautions for the safety and privacy of our younger learners. Where personal information could be entered, for example when a student names a level, the teacher is notified via email and the teacher has the ability to delete the level if its name is rude or compromising.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Our portal only relates to Code for Life and we do not show advertisements on our website or within our lessons.
        </Typography>
      </ListItem>
    </ItemizedList>
  </>
);

const WhoWeAre: React.FC = () => (
  <>
    <Typography>
      We are a company called “Ocado Innovation Limited” or “Ocado Technology”, and we own the Code for Life learning portal. In this notice, we also use the name “Ocado” when we refer to us. Our office is at Buildings 1 & 2 Trident Place, Hatfield Business Park, Mosquito Way, Hatfield, AL10 9UL.
    </Typography>
    <Typography>
      We are responsible for the personal information we collect about you on the Code for Life portal.
    </Typography>
  </>
);

const TypesOfInfo: React.FC = () => (
  <>
    <Typography>
      Your personal data, or personal information, is any information relating to you. It does not include anonymous information, which cannot be traced back to you or another person (anonymous data).
    </Typography>
    <Typography>
      When you use the Code for Life portal and our services we collect the following personal information:
    </Typography>
    <Typography>
      If you are a Student, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          Your name, password and class code: we collect this information when your teacher creates an account.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Your school / club / teaching or education institution and your class code and class name, if you are a school Student: your Teacher provides this information to us.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Performance information about your performance and progress (for example, what levels you have completed and what levels you create), and
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          The coding you create (including any avatars you may create): we collect this information when you use the Code for Life portal.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Your messages and queries you may send us: when you use the “Contact Us” form or email.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          When your account was created and when you last logged into your account: this information is generated at the time your account is created or you log in.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Technical information, such as the IP address and other information about the device you use to access the Code for Life portal, and technical information about how you use these (for example, which pages on our portal you visit, for how long you stay on each page, etc.): when you navigate the portal and allow the use of non-essential cookies.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Data from Code for Life surveys you may take part in.
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      If you are a Independent Student, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          TODO
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      If you are a Teacher, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          TODO
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      If you are a Website visitor, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          TODO
        </Typography>
      </ListItem>
    </ItemizedList>
  </>
);

const HowWeUseInfo: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const ChangeOfPurpose: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const Cookies: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const SharingInfo: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const KeepInfo: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const YourRights: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const InfoSecurity: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const HowToComplain: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const Changes: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const ContactUs: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const ExtraHelp: React.FC = () => (
  <>
    <Typography>
      TODO
    </Typography>
  </>
);

const ForAdults: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography fontWeight='bold'>
          Last Updated: 25th January 2023
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
          Please read this notice carefully. This notice contains important information on who manages the Code for Life portal, how and why we collect information about you (for example, your name and email address), how we use your information, and with which persons we share your information. We also explain what rights you have in relation to your personal information, for example, the right to say no to the use of your information in certain cases, and how to contact us if you want to find out more about your rights or if you have other questions about this notice.
        </Typography>
      </Grid>
      <Grid xs={12}>
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
      </Grid>
    </Grid>
  );
};

export default ForAdults;
