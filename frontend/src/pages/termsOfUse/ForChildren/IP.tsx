import React from 'react';
import {
  Stack,
  ListItemText,
  Typography
} from '@mui/material';
import { ItemizedList } from 'codeforlife/lib/esm/components';

const IP: React.FC = () => {
  return (
    <Stack>
      <Typography>
        The contents of the Code for Life website are our ‘Intellectual Property’. This means that you cannot copy or reuse them without our permission. Just because it is easy to copy some of the content on the website, this does not mean it is allowed. The content covered by Intellectual Property includes:
      </Typography>
      <ItemizedList styleType='lower-alpha'>
        <ListItemText>
          Rapid Router and the Kurono applications
        </ListItemText>
        <ListItemText>
          Games – this will include the design of the games (for example their graphics, style and gameplay)
        </ListItemText>
        <ListItemText>
          Avatars, whether they are drawn or animated
        </ListItemText>
        <ListItemText>
          Any other software or services you see on our website
        </ListItemText>
        <ListItemText className='last'>
          Source Code (this is the code that our website and games are made up of)
        </ListItemText>
      </ItemizedList>
    </Stack>
  );
};

export default IP;
