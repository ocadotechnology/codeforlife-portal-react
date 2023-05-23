import React from 'react';
import {
  Stack,
  ListItemText,
  Typography
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const Misuse: React.FC = () => {
  return (
    <Stack>
      <Typography>
        We reserve the right (a) to suspend or terminate any User’s access to Code for Life, or parts of it, and/or (b) to remove, or require the User to remove, material posted on Code for Life, if the User or material appears to us, or to someone who has complained to us, to be in breach of any provision of the Terms & Conditions.
      </Typography>
      <Typography>
        Any person whose access has been suspended or terminated may not re-register for, or re-access, the Code for Life portal without our prior written consent. You are responsible for everything which is done on or through the Code for Life portal through your registered email address(es) or whilst your Users account is logged on to the Code for Life site. In addition, we reserve the right to suspend or terminate any User’s access to Code for Life, or parts of it, if the relevant User is abusive, discriminatory or threatening, or harasses or communicates offensive messages or images to another User; irrespective of whether this is done through the Code for Life site.
      </Typography>
      <Typography>
        We endeavour to ensure that the Code for Life website and access to your account and our games, platforms and other products or services are available 24 hours a day, but occasionally your access to the Code for Life website or to your account (including any old or live games or avatars) may be restricted to allow for repairs, maintenance or the introduction of new features or services. We aim to provide the best service possible, but we do not warrant that the Code for Life website, access to your account or any of the games, platforms or any of our other products or services (whether online or otherwise) will be fault, virus or error free. If you detect a problem or fault, please contact us using the contact us form and we will endeavour to correct the fault as quickly as we can.
      </Typography>
      <Typography>
        Notwithstanding any of the above, we reserve the right to decline any new registrations or suspend or cancel a User’s account at any time and at our sole discretion (and without telling you beforehand), and we reserve the right to terminate your access to all or part of the games, platforms and other products or services that we make available from time to time (whether online or otherwise) which shall include any old or live games or avatar(s) you have created.
      </Typography>
      <Typography fontWeight='bold'>
        The Code for Life portal is intended to be used by its Users and Students for the purposes we describe in the Terms & Conditions and not for any other purposes. Accordingly, Users and Students must not:
      </Typography>
      <ItemizedList styleType='disc'>
        <ListItemText>
          place material on, or otherwise use, the Code for Life for any business or commercial purpose; or
        </ListItemText>
        <ListItemText>
          use their access to the Code for Life, or information gathered from it, in connection with the sending of unsolicited bulk email (sometimes known as spam).
        </ListItemText>
      </ItemizedList>
    </Stack>
  );
};

export default Misuse;
