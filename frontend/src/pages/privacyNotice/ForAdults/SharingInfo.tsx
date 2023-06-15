import React from 'react';
import {
  Typography,
  ListItemText,
  Link
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const SharingInfo: React.FC = () => (
  <>
    <ItemizedList styleType='disc'>
      <ListItemText>
        We share your personal information with our <strong>employees</strong>, to the extent this is necessary for them to perform their tasks, and with members of our group of companies, for the purposes set out in this Notice.
      </ListItemText>
      <ListItemText>
        We also share some limited information with third party <strong>service providers</strong> (as explained below) – these are companies that help us provide the portal to you, and they also help us to do all the actions that we describe in this Notice. When we trust our service providers with your information, we require them to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal information for specified purposes and in accordance with our instructions. We use the following types of service providers:
      </ListItemText>
    </ItemizedList>
    <Typography variant='h6'>
      IT, email and web service providers
    </Typography>
    <Typography>
      We share your personal information with our IT, email and web service providers, in order to enable them to provide us with their services. For example, we share your name and email address details with DotDigital, a service provider used for the purposes of sending emails to our users (such as newsletters, collecting feedback, or any important service related emails). This data sharing enables us to send you emails, view when they are opened and view which links are clicked.
    </Typography>
    <Typography variant='h6'>
      Surveys, support and feedback providers
    </Typography>
    <Typography>
      Freshdesk is our third party customer support tool that enables customers to contact us through a ticketing system on the website.
    </Typography>
    <Typography>
      For more information on Freshdesk’s Privacy Notice, visit&nbsp;
      <Link href='https://www.freshworks.com/privacy/'>
        https://www.freshworks.com/privacy/
      </Link>
      .
    </Typography>
    <Typography>
      For more information on Freshdesk and GDPR, visit&nbsp;
      <Link href='https://freshdesk.com/gdpr'>
        https://freshdesk.com/gdpr
      </Link>
      .
    </Typography>
    <Typography>
      We will occasionally ask for feedback on our portal. We will usually do this via an email which will direct you to our survey provider, <strong>UsabilityHub</strong>. It will only record; time spent, country, device type, device platform, unless specifically asked within the questions themselves for example, the survey may ask your age. You can find out more about UsabilityHub&nbsp;
      <Link href='https://usabilityhub.com/'>
        here
      </Link>
      .
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItemText>
        If our business or part of our business is sold to another company, typically customer information would be transferred to that company. However, that company would still need to comply with this Privacy Notice and treat personal information as described in this Privacy Notice.
      </ListItemText>
      <ListItemText>
        Where necessary, we share personal information with our <strong>business advisors</strong>, such as legal advisors, consultants, accountants or auditors, for the purposes outlined in this Notice.
      </ListItemText>
      <ListItemText>
        In the event of a legal dispute, a court order or a legitimate request from a <strong>law enforcement agency or other public authority</strong>, we will share your personal information with our legal advisors, courts or such public authority, as necessary.
      </ListItemText>
    </ItemizedList>
  </>
);

export default SharingInfo;
