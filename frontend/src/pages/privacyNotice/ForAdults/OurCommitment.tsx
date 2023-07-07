import React from 'react';
import {
  Typography,
  ListItemText
} from '@mui/material';

import { ItemizedList } from 'codeforlife/lib/esm/components';

const OurCommitment: React.FC = () => (
  <>
    <Typography>
      We are deeply committed to creating a safe and secure online learning environment for all students, teachers, parents and guardians who use the Code for Life portal.
    </Typography>
    <ItemizedList styleType='decimal'>
      <ListItemText>
        We strive to give you control over the personal information that you give us, and we take the protection of your information very seriously.
      </ListItemText>
      <ListItemText>
        We take extra precautions for the safety and privacy of our younger learners. Where personal information could be entered, for example when a student names a level, the teacher is notified via email and the teacher has the ability to delete the level if its name is rude or compromising.
      </ListItemText>
      <ListItemText className='last'>
        Our portal only relates to Code for Life and we do not show advertisements on our website or within our lessons.
      </ListItemText>
    </ItemizedList>
  </>
);

export default OurCommitment;
