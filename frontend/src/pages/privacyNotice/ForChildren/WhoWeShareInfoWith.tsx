import React from 'react';
import {
  Typography,
  Link
} from '@mui/material';

const WhoWeShareInfoWith: React.FC = () => <>
  <Typography>
    Your personal information will be shared with the Code for Life Team in Ocado, so they can set up and run your account.
  </Typography>
  <Typography>
    We may also share a small amount of information with organisations that provide email services to help us run the Code for Life website.
  </Typography>
  <Typography>
    For example, we share your name and email address details with DotDigital, a company that sends emails to users on our behalf (such as when we want to collect your feedback or need to give you important email updates about our service). This data sharing also allows us to view when your emails have been opened.
  </Typography>
  <Typography>
    Another company we share personal data with is Freshdesk. They help us keep track of the questions users send using the Contact Us form, so we can reply to them more quickly.
  </Typography>
  <Typography>
    We also use a survey company called UsabilityHub to help us carry out surveys. UsabilityHub records time spent on the site, country, device type, device platform alongside any questions that we may ask you in our surveys (for example, the survey may ask your age). You can find out more about UsabilityHub&nbsp;
    <Link href='https://usabilityhub.com/'>
      here
    </Link>
    .
  </Typography>
  <Typography>
    We’ll only share your personal information with organisations mentioned in this Privacy Notice. They all sign an agreement to say that they will keep your personal information as safe and secure as we do, and that they will strictly follow our instructions on how your data can be used.
  </Typography>
  <Typography>
    Finally, we may need to share your information for legal reasons, such as if we sold our business to another company, if our business advisors needed the information to help us achieve the purposes in this Privacy Notice, or to respond to law enforcement or court requests if there is a legal problem.
  </Typography>
</>;

export default WhoWeShareInfoWith;
