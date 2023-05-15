import React from 'react';
import {
  Unstable_Grid2 as Grid,
  ListItemText,
  Typography
} from '@mui/material';
import { ItemizedList } from 'codeforlife/lib/esm/components';

const OurResponsibilities: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography>
          We will not be responsible for:
        </Typography>
        <ItemizedList styleType='disc'>
          <ListItemText>
            viruses, trojans and similar threats that could affect your access to, or use of, the website (including your account),
          </ListItemText>
          <ListItemText>
            any problems you have logging on because your computer, mobile device, broadband or software won’ work with our site,
          </ListItemText>
          <ListItemText>
            any delays or failures that happen when you are using the site,
          </ListItemText>
          <ListItemText>
            any errors loss of access to the site caused by a technical problem at Ocado,
          </ListItemText>
          <ListItemText>
            the site not being suitable for your learning needs,
          </ListItemText>
          <ListItemText>
            any inaccuracies in the description of our games or levels.
          </ListItemText>
        </ItemizedList>
      </Grid>
    </Grid>
  );
};

export default OurResponsibilities;
