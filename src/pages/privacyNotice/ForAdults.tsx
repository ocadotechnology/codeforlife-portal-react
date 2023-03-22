import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
  List,
  ListItem
} from '@mui/material';

import TableOfContents from 'components/TableOfContents';

const OurCommitment: React.FC = () => (
  <>
    <Typography>
      We are deeply committed to creating a safe and secure online learning environment for all students, teachers, parents and guardians who use the Code for Life portal.
    </Typography>
    <List sx={{
      listStyleType: 'disc',
      pl: 2,
      '&.MuiListItem-root': {
        display: 'list-item'
      }
    }}>
      <ListItem>
        <Typography>test</Typography>
      </ListItem>
    </List>
  </>
);

const ForAdults: React.FC = () => {
  return (
    <Grid container>
      <Grid xs={12}>
        <Typography fontWeight='bold'>
          Last Updated: 25th January 2023
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography>
          Please read this notice carefully. This notice contains important information on who manages the Code for Life portal, how and why we collect information about you (for example, your name and email address), how we use your information, and with which persons we share your information. We also explain what rights you have in relation to your personal information, for example, the right to say no to the use of your information in certain cases, and how to contact us if you want to find out more about your rights or if you have other questions about this notice.
        </Typography>
      </Grid>
      <Grid xs={12}>
        <TableOfContents contents={[
          {
            header: 'Our commitment',
            element: <OurCommitment />
          }
        ]} />
      </Grid>
    </Grid>
  );
};

export default ForAdults;
