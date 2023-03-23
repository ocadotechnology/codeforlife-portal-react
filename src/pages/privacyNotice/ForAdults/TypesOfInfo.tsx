import React from 'react';
import {
  Typography,
  ListItem
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const TypesOfInfo: React.FC = () => (
  <>
    <Typography>
      Your personal data, or personal information, is any information relating to you. It does not include anonymous information, which cannot be traced back to you or another person (anonymous data).
    </Typography>
    <Typography>
      When you use the Code for Life portal and our services we collect the following personal information:
    </Typography>
    <Typography>
      If you are a <strong>Student</strong>, we collect:
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
      If you are a <strong>Independent Student</strong>, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          Your name, email address and password: we collect this information when you create an account.
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
          When you created an account and when you last logged in to your account: this information is generated at the time you create your account or log in.
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
      <ListItem>
        <Typography>
          Your marketing preferences, if you select to sign up to our newsletter.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          If you are under 13 years old, we will collect the data of your parent or guardian as you will need to ask them to register on your behalf.
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      If you are a <strong>Teacher</strong>, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          Your first and last names, email address and password: we collect this information when you create an account.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Your school / club / teaching or educational institution, the classes you create, the students you register in each class, and the teachers you invite; also, any material you create: when you use the portal.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Your messages and queries you may send us: when you use the “Contact Us” form or email.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          When you created an account and when you last logged in to your account: this information is generated at the time you create your account or log in.
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
      <ListItem>
        <Typography>
          Your marketing preferences, if you select to sign up to our newsletter.
        </Typography>
      </ListItem>
    </ItemizedList>
    <Typography>
      If you are a <strong>Website visitor</strong>, we collect:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItem>
        <Typography>
          Technical information, such as the IP address and other information about the device you use to access the Code for Life portal, and technical information about how you use these (for example, which pages on our portal you visit, for how long you stay on each page, etc.): when you navigate the portal and allow the use of non-essential cookies.
        </Typography>
      </ListItem>
      <ListItem>
        <Typography>
          Your email address and marketing preferences, if you select to sign up to our newsletter.
        </Typography>
      </ListItem>
    </ItemizedList>
  </>
);

export default TypesOfInfo;
