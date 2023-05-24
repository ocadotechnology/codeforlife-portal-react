import React from 'react';
import {
  Stack,
  ListItemText,
  Typography
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const OtherLimitsOfUse: React.FC = () => {
  return (
    <Stack>
      <Typography>
        You must not:
      </Typography>
      <ItemizedList styleType='lower-alpha'>
        <ListItemText>
          copy content taken from our site or copy content created by another Code for Life user without permission,
        </ListItemText>
        <ListItemText>
          break any laws when using the site,
        </ListItemText>
        <ListItemText>
          create levels that contain offensive, threatening, harmful or false content,
        </ListItemText>
        <ListItemText>
          use the site in a way that causes disruption to other users,
        </ListItemText>
        <ListItemText>
          use the site in a way that helps someone to gain access to other computer systems that they do not have permission to access,
        </ListItemText>
        <ListItemText>
          use the site in a way that affects other peoples’ use or enjoyment of the Code for Life website,
        </ListItemText>
        <ListItemText>
          do anything that could cause damage the site, for example taking action that allows in, computer viruses, logic bombs, Trojan horses or some other kind of harmful software or data.
        </ListItemText>
      </ItemizedList>
    </Stack>
  );
};

export default OtherLimitsOfUse;
