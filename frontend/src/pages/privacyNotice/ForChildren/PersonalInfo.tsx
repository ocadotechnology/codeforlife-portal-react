import React from 'react';
import {
  Typography,
  ListItemText
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const PersonalInfo: React.FC = () => <>
  <Typography>
    When you are signed up to a class <strong>by a teacher</strong> on our Code for Life website, we will collect the following personal information about you:
  </Typography>
  <ItemizedList styleType='disc'>
    <ListItemText>
      Your name,
    </ListItemText>
    <ListItemText>
      Your password (this is encrypted which means we won’t be able to see the password you’ve chosen),
    </ListItemText>
    <ListItemText>
      Information about your performance and progress (for example, what levels you have completed and what levels you create),
    </ListItemText>
    <ListItemText>
      The code you’ve created on our website,
    </ListItemText>
    <ListItemText>
      Any messages you send us when you use the “Contact Us” form or email,
    </ListItemText>
    <ListItemText>
      The date your Code for Life account was created and the date you last logged in,
    </ListItemText>
    <ListItemText>
      The IP address (this is a unique number which identifies the device you’ve used to log on to the Code for Life site) and other information about that device,
    </ListItemText>
    <ListItemText>
      Information about how you use the site, such as which pages you’ve visited and how long you stayed on each page. (We will only do this where you have allowed cookies – see the “Cookies and similar technologies” section for more details),
    </ListItemText>
  </ItemizedList>
  <Typography>
    If you sign up as an <strong>independent student</strong> for our Code for Life website, then we will also collect the following information about you:
  </Typography>
  <ItemizedList styleType='disc'>
    <ListItemText>
      Your email address,
    </ListItemText>
    <ListItemText>
      The answers you give any Code for Life surveys you might fill in, although these are mostly anonymous,
    </ListItemText>
    <ListItemText>
      The marketing choices you have selected, if you are over 18 years of age and have signed up for our newsletter.
    </ListItemText>
  </ItemizedList>
  <Typography mb={0}>
    If you are under 13 years old, you will need to ask a parent or guardian to register for you and we will collect personal information about them.
  </Typography>
</>;

export default PersonalInfo;
