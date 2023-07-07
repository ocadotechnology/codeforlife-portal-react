import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  ListItemText,
  Link
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

import { paths } from '../../../app/router';

const HowWeUseInfo: React.FC = () => {
  const navigate = useNavigate();

  return <>
    <Typography>
      The UK’s Data Protection rules say that we have to have a lawful reason to process your personal information (“lawful” meaning that the law allows us to use your information in that way).
    </Typography>
    <Typography>
      Below we’ve listed the lawful reasons which allow us to process your information for the Code of Life Website:
    </Typography>
    <Typography>
      <strong>Contract:</strong> We have to collect some personal information about you so we can provide you with the services we offer on the Code for Life website. For example, we need your name and a password so you can create an account and access our website and learning materials. This means you can access the portal and learn how to code with the support of your teacher and classmates, or work on your own/with a guardian if you are an independent student.
    </Typography>
    <Typography>
      <strong>Legitimate Interests:</strong> We collect personal information to:
    </Typography>
    <ItemizedList styleType='disc'>
      <ListItemText>
        Help us improve the website and the services we can offer to you,
      </ListItemText>
      <ListItemText>
        Help make sure that our portal is safe and secure and that users are following our&nbsp;
        <Link onClick={() => { navigate(paths.termsOfUse.termsOfUse._); }}>
          Terms of Use
        </Link>
        . For example, we might need to use account information to block a user from Code for Life temporarily or permanently if they misuse the site (e.g. by giving other people access to their account),
      </ListItemText>
      <ListItemText>
        If you are over 13, we need your email address to inform you about updates or changes to our service: for example, to let you know about any changes to our Terms of Use, or about any work we are carrying out that might affect when you can log on to the site. Sometimes, we may be required by law to send you this information,
      </ListItemText>
      <ListItemText>
        We will need to use your personal information to answer any questions you’ve asked using the ‘Contact Us’ form. Messages you send and receive through the site and any forms you send to us will be recorded. The Contact Us form is strictly for the purpose of user support. User-initiated communication concerning topics other than those relating directly to the Code for Life portal, including resources or user experience, may not be answered. Please be aware that we will never ask for personal information other than what is required to identify your account and respond to your queries, and we will never ask for your password,
      </ListItemText>
      <ListItemText className='last'>
        If you or your parent and guardian should make a legal claim against us, we may need to process your personal information to help defend ourselves against that claim.
      </ListItemText>
    </ItemizedList>
  </>;
};

export default HowWeUseInfo;
