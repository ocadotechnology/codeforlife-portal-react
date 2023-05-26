import React from 'react';
import {
  Typography,
  ListItemText,
  Link
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const YourRights: React.FC = () => <>
  <Typography>
    Depending on where you live, you may have the rights to:
  </Typography>
  <ItemizedList styleType='disc'>
    <ListItemText>
      ask us for a copy of the personal information we hold about you,
    </ListItemText>
    <ListItemText>
      have any mistakes in your personal information corrected,
    </ListItemText>
    <ListItemText>
      ask us to limit how we use your personal information,
    </ListItemText>
    <ListItemText>
      ask for your personal information to be deleted,
    </ListItemText>
    <ListItemText>
      ask us give copies of your personal data to another organisation,
    </ListItemText>
    <ListItemText>
      object (say no) to how we are using your personal information,
    </ListItemText>
    <ListItemText>
      ask us to store but not use your personal information,
    </ListItemText>
    <ListItemText>
      change your mind about giving us consent to use your personal data.
    </ListItemText>
  </ItemizedList>
  <Typography>
    If you would like to use any of these rights listed above, please email our Data Protection Officer at&nbsp;
    <Link
      className='body'
      href='mailto:individualrights@ocado.com'
    >
      individualrights@ocado.com
    </Link>
    . Depending on where you live, you may need help from a parent or guardian to use your rights.
  </Typography>
</>;

export default YourRights;
